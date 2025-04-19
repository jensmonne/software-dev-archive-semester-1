using UnityEngine;

public class Coin : MonoBehaviour
{
    public GameManager gmScript; // Reference to the GameManager script

    public void OnTriggerEnter2D(Collider2D other)
    {
        // Check if the object entering the trigger is tagged as "Player"
        if (other.gameObject.CompareTag("Player"))
        {
            // Increase the player's money by 10 using the GameManager script
            gmScript.money += 10;

            // Destroy the coin object to simulate it being collected
            Destroy(gameObject);
        }
    }
}