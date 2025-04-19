using UnityEngine;

public class Ship : MonoBehaviour
{
    // Speed at which the ship moves along the X-axis
    [SerializeField] private float speedX;
    // The width of the ship sprite, calculated at runtime
    private float shipWidth;
    // Reference to the GameManager instance
    private GameManager game;
    // Amount of score to add when the ship is destroyed
    [SerializeField] private int scoreAmount;
    // Sound to play when the ship is destroyed
    [SerializeField] private AudioClip explosionSound;

    // Called when the script is first initialized
    private void Start()
    {
        // Find the first instance of GameManager in the scene
        game = FindFirstObjectByType<GameManager>();
        // Calculate the width of the ship sprite using its SpriteRenderer
        shipWidth = GetComponent<SpriteRenderer>().bounds.size.x;
    }

    // Called once per frame
    private void Update()
    {
        // Move the ship horizontally based on speed and time
        transform.position += new Vector3(speedX * Time.deltaTime, 0f, 0f);

        // Destroy the ship if it moves completely off-screen to the left
        if (transform.position.x + (shipWidth / 2f) < 0)
        {
            Destroy(gameObject);
        }
    }

    // Called when the ship is clicked with the mouse
    private void OnMouseDown()
    {
        // Add score to the GameManager
        game.AddScore(scoreAmount);
        // Trigger the ship's explosion behavior
        Explode();
    }

    // Handles the explosion effect and ship destruction
    private void Explode()
    {
        // Play the explosion sound at the ship's position, if a sound is set
        if (explosionSound != null)
        {
            AudioSource.PlayClipAtPoint(explosionSound, transform.position);
        }

        // Destroy the ship object
        Destroy(gameObject);
    }
}