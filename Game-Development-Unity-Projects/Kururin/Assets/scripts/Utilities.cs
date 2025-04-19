using UnityEngine;
using UnityEngine.SceneManagement;

public class Utilities : MonoBehaviour
{
    // Method to transition to the LevelSelect scene
    public void GoToGame()
    {
        SceneManager.LoadScene("LevelSelect"); // Load the "LevelSelect" scene
    }

    // Method to quit the game and clear all player preferences
    public void QuitGame()
    {
        PlayerPrefs.DeleteAll(); // Deletes all saved player preferences
        Application.Quit(); // Closes the application
        Debug.Log("Quit"); // Logs the quit action for debugging purposes (useful in the editor)
    }

    // Method to return to the main menu
    public void MainMenu()
    {
        SceneManager.LoadScene("Menu"); // Load the "Menu" scene
    }

    // Method to load Level 1
    public void Level_1()
    {
        SceneManager.LoadScene("Level_1"); // Load the "Level_1" scene
    }

    // Method to load Level 2
    public void Level_2()
    {
        SceneManager.LoadScene("Level_2"); // Load the "Level_2" scene
    }
}