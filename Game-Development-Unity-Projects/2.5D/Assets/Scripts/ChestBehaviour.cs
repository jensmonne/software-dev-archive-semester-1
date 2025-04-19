using UnityEngine;

public class Chest : MonoBehaviour
{
    public GameObject loot; // Reference to the loot object (could be a coin, item, or power-up)

    private SpriteRenderer spriteRenderer; // Reference to the SpriteRenderer component (optional)

    private void OnCollisionEnter2D(Collision2D collision)
    {
        // Check if the object colliding with the chest has the tag "Player"
        if (collision.gameObject.CompareTag("Player"))
        {
            OpenChest(); // Call the OpenChest method when the player collides with the chest
        }
    }

    void OpenChest()
    {
        // Check if loot has been assigned to the chest
        if (loot != null)
        {
            // Instantiate the loot at the chest's position with no rotation (Quaternion.identity)
            Instantiate(loot, transform.position, Quaternion.identity);
        }
        
        // Destroy the chest after opening (this simulates the chest being opened and removed)
        Destroy(gameObject);
    }
}