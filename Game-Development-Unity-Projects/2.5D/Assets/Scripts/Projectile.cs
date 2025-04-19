using UnityEngine;

public class Projectile : MonoBehaviour
{
    public float projectileSpeed; // Speed at which the projectile moves
    private Rigidbody2D rb; // Reference to the Rigidbody2D component

    private void Awake()
    {
        // Assign the Rigidbody2D component to the rb variable
        rb = GetComponent<Rigidbody2D>();
    }

    private void Start()
    {
        // Ensure the Rigidbody2D is not null before applying velocity
        if (rb != null)
        {
            // Set the projectile's velocity in the direction it is facing (right in local space)
            rb.linearVelocity = transform.right * projectileSpeed;
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        // Check if the projectile did not collide with the player
        if (!collision.gameObject.CompareTag("Player"))
        {
            // Destroy the projectile upon collision
            Destroy(gameObject);
        }
    }
}