using System;
using UnityEngine;

public class Bucket : MonoBehaviour
{
    public float moveSpeed = 3f; // Speed of bucket movement
    public float boundaryPadding = 1f; // Padding to prevent the bucket from going off-screen
    private GameManager _gameManager; // Reference to the ShooterManager to track bullet count

    private float screenWidth;
    private bool movingRight = true; // Direction flag
    
    private Rigidbody2D rb2d;

    [Obsolete("Obsolete")]
    private void Start()
    {
        rb2d = GetComponent<Rigidbody2D>();
        // Find the ShooterManager dynamically (searching for it in the scene)
        _gameManager = FindObjectOfType<GameManager>();
        if (_gameManager == null)
        {
            Debug.LogError("gameManager not found in the scene!");
        }
        rb2d.linearVelocity = new Vector2(-moveSpeed, rb2d.linearVelocity.y);
    }
    

    // When a ball enters the bucket, add an extra bullet and destroy the ball
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Ball") && _gameManager != null)
        {
            _gameManager.AddExtraBullet(); // Notify ShooterManager to add an extra bullet
            Destroy(other.gameObject); // Destroy the ball after collecting it
        }
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        // Check if the object has collided with a "Wall"
        if (other.gameObject.CompareTag("Wall"))
        {
            // If currently moving right, reverse the direction to left
            if (movingRight)
            {
                movingRight = false;
                rb2d.linearVelocity = new Vector2(-moveSpeed, rb2d.linearVelocity.y);
                // Example: rb.velocity = new Vector2(-moveSpeed, rb.velocity.y);
            }
            else
            {
                // If already moving left, reverse the direction to right
                movingRight = true;
                rb2d.linearVelocity = new Vector2(moveSpeed, rb2d.linearVelocity.y);
                // Example: rb.velocity = new Vector2(moveSpeed, rb.velocity.y);
            }
        }
    }

}
