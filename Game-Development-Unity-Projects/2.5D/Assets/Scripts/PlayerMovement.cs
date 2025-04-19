using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public float speed = 5f; // Player movement speed
    private Rigidbody2D rb; // Reference to the Rigidbody2D component
    private Vector2 movement; // Stores the player's movement input

    private void Start()
    {
        // Get the Rigidbody2D component attached to the player
        rb = GetComponent<Rigidbody2D>();
    }

    private void FixedUpdate()
    {
        // Get movement input from the Horizontal and Vertical axes
        float moveX = Input.GetAxisRaw("Horizontal"); // Input: A/D or Left/Right Arrow keys
        float moveY = Input.GetAxisRaw("Vertical"); // Input: W/S or Up/Down Arrow keys

        // Combine inputs into a normalized Vector2 for consistent speed in diagonal movement
        movement = new Vector2(moveX, moveY).normalized;

        // Rotate the character to face the direction of movement
        if (movement.sqrMagnitude > 0.01f) // Ensures rotation occurs only when moving
        {
            RotateCharacterToMovementDirection();
        }

        // Set the Rigidbody2D's velocity to move the character
        rb.linearVelocity = movement * speed;

        // Optional: Uncomment for "ice physics" where movement feels more slippery
        // Add force instead of directly setting velocity
        // rb.AddForce(movement * (speed * Time.fixedDeltaTime), ForceMode2D.Impulse);
    }

    private void RotateCharacterToMovementDirection()
    {
        // Calculate the angle of movement direction using atan2 (Y, X)
        float angle = Mathf.Atan2(movement.y, movement.x) * Mathf.Rad2Deg;

        // Apply the rotation to the character with an offset to align properly
        transform.rotation = Quaternion.Euler(new Vector3(0, 0, angle - 90));
    }
}