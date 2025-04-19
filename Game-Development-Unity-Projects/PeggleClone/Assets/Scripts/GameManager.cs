using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    // References to the SaveManager and PegSpawner
    public SaveManager saveManager;
    public PegSpawner pegSpawner;
    
    // Current level and stage information
    public int currentLevel = 1;
    public int currentStage;
    public bool levelActive;
    
    // Bullet count and UI reference
    public int bulletCount = 10;
    public TMP_Text bulletCountText;

    // Singleton instance of GameManager
    private static GameManager Instance;

    // Called when the script is loaded or a scene is loaded
    private void Awake()
    {
        // Load game data (player progress, etc.)
        saveManager.LoadGameData();

        // Singleton pattern to ensure only one GameManager exists
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject); // Prevent GameManager from being destroyed when changing scenes
        }
        else
        {
            Destroy(gameObject); // Destroy duplicate instances of GameManager
        }
    }

    // Called once per frame
    private void Update()
    {
        // Check if the ball object is active in the scene
        if (GameObject.FindWithTag("Ball") == true)
        {
            levelActive = true; // Level is active if the ball is present
        }
        else
        {
            levelActive = false; // Level is not active if no ball is found
        }
        
        // Reset the current level if it exceeds level 3
        if (currentLevel >= 3)
        {
            currentLevel = 0; // Loop back to level 0 (or start over)
        }
        
        // Check if the PegSpawner exists
        if (pegSpawner)
        {
            // Level completes if all orange pegs are destroyed and the level is not active
            if (pegSpawner.totalOrangeCount <= 0 && levelActive == false)
            {
                currentLevel += 1; // Move to the next level
                bulletCount = 10; // Reset bullet count for the new level
                SceneManager.LoadScene(currentLevel); // Load the new level scene
            }

            // If there are still orange pegs left, but no bullets, reset the level
            if (pegSpawner.totalOrangeCount > 0 && levelActive == false && bulletCount <= 0)
            {
                currentLevel = 0; // Reset to the first level
                SceneManager.LoadScene(currentLevel); // Load the first level scene
            }
        }
        else
        {
            pegSpawner = FindObjectOfType<PegSpawner>(); // Find PegSpawner if not assigned
        }
        
        // Update the bullet count text UI if we're not on the main menu scene (buildIndex 0)
        if (SceneManager.GetActiveScene().buildIndex != 0)
        {
            // Check if bulletCountText reference is not set, and find it in the scene if needed
            if (bulletCountText == null)
            {
                bulletCountText = GameObject.Find("BulletCountText").GetComponent<TMP_Text>();
            }
            
            // Update the UI text with the current bullet count
            bulletCountText.text = "Bullets Remaining: " + bulletCount;
        }
        else
        {
            currentLevel = 1; // Reset to level 1 if on the main menu
        }
    }

    // Method to add an extra bullet to the bullet count
    public void AddExtraBullet()
    {
        bulletCount += 1; // Increase bullet count by 1
        Debug.Log("AddExtraBullet"); // Log the action to the console
    }
}