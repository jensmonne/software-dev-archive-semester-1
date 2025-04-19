using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public int money; // Tracks the player's money or currency
    
    public bool hpTrigger; // A flag to trigger health decrease (e.g., when the player is damaged)

    [SerializeField] private int health = 3; // Tracks the player's health, with a default value of 3

    // private void Start()
    // {
    //     // You can initialize variables here if necessary
    // }

    private void Update()
    {
        // If the hpTrigger flag is set, call HealthUpdate to reduce health
        if (hpTrigger)
        {
            HealthUpdate();
        }
    }

    private void HealthUpdate()
    {
        // Disable the hpTrigger flag to prevent continuous health updates
        hpTrigger = false;

        // Decrease health by 1
        health -= 1;

        // Check if health has dropped to zero or below
        if (health <= 0)
        {
            // If health is zero or below, load the "MainMenu" scene (e.g., game over)
            SceneManager.LoadScene("MainMenu");
        }
    }
}