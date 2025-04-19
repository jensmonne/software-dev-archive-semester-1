using UnityEngine;
using UnityEngine.SceneManagement;

public class Utility : MonoBehaviour
{
    // Method to transition to the "Overworld" scene
    public void GoToGame()
    {
        SceneManager.LoadScene("Overworld"); // Load the "Overworld" scene
    }

    // Method to quit the game application
    public void QuitGame()
    {
        Application.Quit(); // Exit the application
        Debug.Log("Quit"); // Log a message to the console for debugging purposes (works in Unity Editor)
    }
}