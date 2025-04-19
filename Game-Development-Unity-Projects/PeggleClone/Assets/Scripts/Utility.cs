using System;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Utility : MonoBehaviour
{
    // References to SaveManager and GameManager to handle saving and loading game data
    public SaveManager saveManager;
    public GameManager gameManager;

    // Start is marked as Obsolete, to discourage its use
    [Obsolete("Obsolete")]
    public void Start()
    {
        // Find and assign the GameManager and SaveManager from the scene if not already assigned
        gameManager = FindObjectOfType<GameManager>();
        saveManager = FindObjectOfType<SaveManager>();
    }

    // Method to quit the game, saving the data before exiting
    public void QuitGame()
    {
        saveManager.SaveGameData(); // Save game data before quitting
        Application.Quit(); // Exit the game
        Debug.Log("Quit"); // Log the quitting action for debugging purposes
    }
    
    // Method to return to the Main Menu, saving game data before transitioning
    public void MainMenu()
    {
        saveManager.SaveGameData(); // Save game data before returning to the main menu
        SceneManager.LoadScene("MainMenu"); // Load the scene with the name "MainMenu"
    }
    
    // Method to return to the current level as per the GameManager
    public void GoToCurrentLevel()
    {
        // Load the scene corresponding to the current level from the GameManager
        SceneManager.LoadScene(gameManager.currentLevel);
    }
}