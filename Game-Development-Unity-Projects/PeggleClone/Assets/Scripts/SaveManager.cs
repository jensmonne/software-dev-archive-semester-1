using UnityEngine;
using System.IO;

public class SaveManager : MonoBehaviour
{
    // References to ScoreManager and GameManager to access and store game state
    public ScoreManager scoreManager; // Assign in the Inspector
    public GameManager gameManager;  // Assign in the Inspector

    // Class to store game data, such as high score, current level, and current stage
    public class GameData
    {
        public int highScore;  // Store the high score
        public int currentLevel;  // Store the current level
        public int currentStage;  // Store the current stage
    }

    // Singleton instance to ensure only one SaveManager exists
    private static SaveManager Instance;
    // Path where the game data is saved
    private string saveFilePath;

    // Awake is called when the script is first loaded
    private void Awake()
    {
        // Singleton pattern to ensure there is only one instance of SaveManager
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject); // Keep this instance across scenes
            saveFilePath = Path.Combine(Application.persistentDataPath, "GameData.json"); // Set the path to save the data
        }
        else
        {
            Destroy(gameObject); // Destroy any extra SaveManager instances to enforce singleton
        }
    }

    // Update is called once per frame to check if the references are set
    public void Update()
    {
        // Check if references to ScoreManager and GameManager are missing and try to find them
        if (gameManager == null || scoreManager == null)
        {
            scoreManager = FindObjectOfType<ScoreManager>();
            gameManager = FindObjectOfType<GameManager>();
        }
    }

    // Method to load game data from a save file
    public void LoadGameData()
    {
        // Check if the save file exists
        if (File.Exists(saveFilePath))
        {
            // Read the JSON data from the file
            string json = File.ReadAllText(saveFilePath);
            // Deserialize the JSON data into a GameData object
            GameData data = JsonUtility.FromJson<GameData>(json);

            // Update the ScoreManager and GameManager with the loaded data
            if (scoreManager != null)
                scoreManager.highScore = data.highScore;

            if (gameManager != null)
            {
                gameManager.currentLevel = data.currentLevel;
                gameManager.currentStage = data.currentStage;
            }
        }
        else
        {
            Debug.LogWarning("Save file not found. Using default values.");
        }
    }

    // Method to save game data to a file
    public void SaveGameData()
    {
        // Check if ScoreManager or GameManager references are missing
        if (gameManager == null || scoreManager == null)
        {
            Debug.LogError("Cannot save game data: Missing references to GameManager or ScoreManager.");
            return;
        }

        // Create a GameData object to store the current game state
        GameData data = new GameData
        {
            highScore = scoreManager.highScore, // Get the current high score
            currentLevel = gameManager.currentLevel, // Get the current level
            currentStage = gameManager.currentStage // Get the current stage
        };

        // Serialize the GameData object to JSON format
        string json = JsonUtility.ToJson(data, true); // `true` enables pretty-printing for better readability
        // Write the serialized JSON data to the save file
        File.WriteAllText(saveFilePath, json);

        Debug.Log($"Game data saved to {saveFilePath}"); // Log a message confirming the save location
    }
}
