using UnityEngine;

public class Goblin : MonoBehaviour
{
    private Rigidbody2D rb; // The Rigidbody2D component to apply physics-based movement
    private Transform player; // The player's transform to track its position

    public float drag = 1f; // The drag to apply to the goblin’s movement for smoothness
    public float speed = 2f; // The patrol speed of the goblin when not chasing
    public float chaseSpeed = 3.5f; // The speed at which the goblin chases the player
    public float patrolRange = 3f; // The range (distance) the goblin will patrol from its initial position
    public float detectionRange = 5f; // The detection range for when the goblin notices the player
    public int health = 2; // The goblin's health

    private Vector2 initialPosition; // The starting position of the goblin
    private Vector2 patrolTarget; // The target point the goblin patrols to
    private bool isChasing; // A flag to determine if the goblin is currently chasing the player

    private void Awake()
    {
        rb = GetComponent<Rigidbody2D>(); // Initialize the Rigidbody2D component
    }

    private void Start()
    {
        rb.linearDamping = drag; // Set the drag of the Rigidbody2D for smoother movement
        initialPosition = transform.position; // Set the initial position of the goblin
        patrolTarget = initialPosition + Vector2.right * patrolRange; // Set the initial patrol target
        
        player = GameObject.FindWithTag("Player").transform; // Find the player by its "Player" tag
    }

    private void Update()
    {
        if (!player) return; // If no player is found, exit the update method

        // Calculate the distance between the goblin and the player
        float distanceToPlayer = Vector2.Distance(transform.position, player.position);

        // If the player is within detection range, start chasing
        if (distanceToPlayer <= detectionRange)
        {
            isChasing = true;
        }
        // If the player is outside detection range, stop chasing
        else if (distanceToPlayer > detectionRange)
        {
            isChasing = false;
        }
    }

    private void FixedUpdate()
    {
        if (isChasing)
        {
            // Move towards the player when chasing
            Vector2 direction = (player.position - transform.position).normalized;
            rb.linearVelocity = direction * chaseSpeed;
        }
        else
        {
            Patrol(); // Patrol if the goblin is not chasing the player
        }
    }

    private void Patrol()
    {
        // Move towards the patrol target
        Vector2 direction = (patrolTarget - (Vector2)transform.position).normalized;
        rb.linearVelocity = direction * speed;

        // If the goblin reaches the patrol target, switch the target point
        if (Vector2.Distance(transform.position, patrolTarget) < 0.1f)
        {
            // Switch patrol target between initial position and the patrol range
            patrolTarget = (Vector2)transform.position == initialPosition ? initialPosition + Vector2.right * patrolRange : initialPosition;
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        // If the goblin collides with an arrow, reduce health
        if (collision.gameObject.CompareTag("Arrow"))
        {
            health -= 1;
        }

        // If health reaches 0, destroy the goblin
        if (health <= 0)
        {
            Destroy(gameObject);
        }
    }
}