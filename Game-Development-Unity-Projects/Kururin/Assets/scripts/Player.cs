using UnityEngine;
using UnityEngine.SceneManagement;

public class Player : MonoBehaviour
{
    public float maxVelocity = 10f; // Maximum velocity for the player
    private Rigidbody2D _rigidBody; // Rigidbody2D component for player movement

    public Game gameScript; // Reference to the Game script

    void Start()
    {
        // Find the Game script in the scene and initialize the Rigidbody2D component
        gameScript = FindObjectOfType<Game>();
        _rigidBody = GetComponent<Rigidbody2D>();

        // Initialize player's health at the start of the game
        gameScript.health = 3;
    }

    private void FixedUpdate()
    {
        // Gradually rotate the player object
        _rigidBody.rotation -= 2f;

        // Handle horizontal movement based on input
        if (Input.GetAxis("Horizontal") > 0)
        {
            _rigidBody.AddForce(new Vector2(10, 0)); // Move right
        }
        else if (Input.GetAxis("Horizontal") < 0)
        {
            _rigidBody.AddForce(new Vector2(-10, 0)); // Move left
        }
        else
        {
            // Reduce horizontal velocity gradually for smooth deceleration
            Vector2 velocity = _rigidBody.linearVelocity;
            velocity.x *= 0.96f;
            _rigidBody.linearVelocity = velocity;
        }

        // Handle vertical movement based on input
        if (Input.GetAxis("Vertical") > 0)
        {
            _rigidBody.AddForce(new Vector2(0, 10)); // Move up
        }
        else if (Input.GetAxis("Vertical") < 0)
        {
            _rigidBody.AddForce(new Vector2(0, -10)); // Move down
        }
        else
        {
            // Reduce vertical velocity gradually for smooth deceleration
            Vector2 velocity = _rigidBody.linearVelocity;
            velocity.y *= 0.96f;
            _rigidBody.linearVelocity = velocity;
        }

        // Clamp the player's velocity to prevent exceeding max speed
        ClampVelocity();
    }

    private void ClampVelocity()
    {
        // Get the current velocity
        Vector2 clampedVelocity = _rigidBody.linearVelocity;

        // Limit the horizontal velocity within the maxVelocity range
        clampedVelocity.x = Mathf.Clamp(clampedVelocity.x, -maxVelocity, maxVelocity);

        // Limit the vertical velocity within the maxVelocity range
        clampedVelocity.y = Mathf.Clamp(clampedVelocity.y, -maxVelocity, maxVelocity);

        // Apply the clamped velocity to the Rigidbody2D
        _rigidBody.linearVelocity = clampedVelocity;
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (gameScript != null)
        {
            // If colliding with an object tagged "HitWall", decrease health
            if (collision.gameObject.CompareTag("HitWall"))
            {
                gameScript.hSignalActive = true; // Trigger health reduction
            }

            // If colliding with an object tagged "Finish", check for level progression
            if (collision.gameObject.CompareTag("Finish"))
            {
                // If on Level 3 and not yet completed, increment level
                if (SceneManager.GetActiveScene().buildIndex == 3 && gameScript.currentLevel == 0)
                {
                    gameScript.currentLevel++;
                }

                // Signal level completion
                gameScript.fSignalActive = true;
            }
        }
    }
}