using TMPro; // For using TextMeshPro components
using UnityEngine;

public class GameManager : MonoBehaviour
{
    // Reference to the TextMeshProUGUI component to display the score
    [SerializeField] private TextMeshProUGUI scoreText;
    
    // Current player score
    private int score;

    // Called when the game starts
    void Start()
    {
        // Initialize the score to 0
        score = 0;

        // Update the score display with the initial score
        scoreText.text = "Score: " + score;
    }

    // Method to add a specified amount to the score
    public void AddScore(int amount)
    {
        // Increment the score by the given amount
        score = score + amount;

        // Update the score display with the new score
        scoreText.text = "Score: " + score;
    }
}