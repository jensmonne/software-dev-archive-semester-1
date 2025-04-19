using TMPro; // Namespace for TextMeshPro for better UI text rendering
using UnityEngine; // Core Unity engine namespace
using UnityEngine.SceneManagement; // Namespace for managing scene transitions

public class Game : MonoBehaviour
{
    public int health = 3; // Player's health, starts at 3

    public int currentLevel; // Tracks the current game level
    
    public bool hSignalActive; // Signal to decrease health
    
    public bool fSignalActive; // Signal to advance the level
    
    private static Game Instance; // Singleton instance of the Game class
    
    public TMP_Text healthText; // UI text element to display health

    private void Awake()
    {
        // Singleton pattern implementation
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject); // Persist the object across scene transitions
        }
        else
        {
            Destroy(gameObject); // Destroy duplicate Game objects
        }
    }

    void Update()
    {
        // Check if hSignalActive is true to decrease health
        if (hSignalActive)
        {
            health -= 1; // Decrease health by 1
            hSignalActive = false; // Reset the signal
        }
        
        // If health reaches 0, reset health and load GameOver scene
        if (health <= 0)
        {
            health = 3; // Reset health to 3
            SceneManager.LoadScene("GameOver"); // Load GameOver scene
        }

        // Check if fSignalActive is true to advance levels
        if (fSignalActive)
        {
            currentLevel++; // Increment current level
            fSignalActive = false; // Reset the signal

            // Check the current level and load the appropriate scene
            if (currentLevel == 1)
            {
                SceneManager.LoadScene("Level_2"); // Load Level 2
            }
            else if (currentLevel == 2)
            {
                currentLevel = 0; // Reset level count for next game loop
                SceneManager.LoadScene("WinScreen"); // Load the win screen
            }
        }

        // Update the health UI if the healthText reference is valid
        if (healthText != null)
        {
            healthText.text = "Health: " + health; // Update the displayed health
        }
        else
        {
            // Attempt to find and assign the health text if on Level 2 or Level 3
            if (SceneManager.GetActiveScene().buildIndex == 2 || SceneManager.GetActiveScene().buildIndex == 3)
            {
                healthText = GameObject.Find("HP").GetComponent<TMP_Text>(); // Find the text object named "HP"
            }
        }
        
        // Reset the currentLevel variable if on GameOver or WinScreen scenes
        if (SceneManager.GetActiveScene().buildIndex == 4 || SceneManager.GetActiveScene().buildIndex == 5)
        {
            currentLevel = 0; // Reset the level count
        }
    }
}