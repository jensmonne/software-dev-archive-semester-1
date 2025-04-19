using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ScoreManager : MonoBehaviour
{
    // Reference to PegSpawner to access the number of remaining orange pegs
    public PegSpawner pegSpawner;

    // Variables to track the current score for the level and the high score
    public int currentLevelScore;  // Tracks the score for the current level
    public int highScore;          // Placeholder for high score logic (can be expanded in the future)

    // Singleton instance to ensure only one ScoreManager exists
    private static ScoreManager _instance;

    // Reference to the TMP_Text component to display the score on screen
    public TMP_Text scoreText;

    // Awake is called when the script is first loaded
    private void Awake()
    {
        // Singleton pattern: Ensure only one instance of ScoreManager exists
        if (_instance == null)
        {
            _instance = this;
            DontDestroyOnLoad(gameObject);  // Keep this instance across scenes
        }
        else
        {
            Destroy(gameObject);  // Destroy extra ScoreManager instances to enforce singleton
        }
        Debug.Log("ScoreManager initialized");
    }

    // Start is called before the first frame update
    public void Start()
    {
        // Try to find and assign the PegSpawner reference at the start
        pegSpawner = GameObject.Find("PegSpawner").GetComponent<PegSpawner>();
        
        // If the PegSpawner is not found, log an error
        if (pegSpawner == null)
        {
            Debug.LogError("PegSpawner is Not Found in ScoreManager");
        }
    }

    // Method to add score, incorporating a multiplier based on remaining orange pegs
    public void AddScore(int baseScore)
    {
        // Get the multiplier based on the number of remaining orange pegs
        int multiplier = BallScript.GetMultiplier(pegSpawner.orangeCount);
        
        // Calculate the total score to add, applying the multiplier
        int scoreToAdd = baseScore * multiplier;
        
        // Add the calculated score to the current level's score
        currentLevelScore += scoreToAdd;

        // Log the score added and the total current level score
        Debug.Log($"Score Added: {scoreToAdd}, Total Score: {currentLevelScore}");

        // Update the score text on the screen if we're not on the main menu
        if (SceneManager.GetActiveScene().buildIndex != 0)  // Main menu scene check
        {
            // If scoreText reference is not set, find it in the scene
            if (scoreText == null)
            {
                scoreText = GameObject.Find("ScoreText").GetComponent<TMP_Text>();
            }

            // Update the displayed score text
            scoreText.text = "Score: " + currentLevelScore;
        }
    }
}