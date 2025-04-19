using UnityEngine;

public class BallScript : MonoBehaviour
{
    // Base score values for different peg types
    public int BaseScore = 10;
    public int BaseScoreOrange = 100;

    // References to ScoreManager and PegSpawner to manage score and peg counts
    private ScoreManager scoreManager;
    private PegSpawner pegSpawner;

    // Called when the script starts (initialization)
    private void Start()
    {
        // Find and assign the ScoreManager and PegSpawner components from the scene
        scoreManager = GameObject.Find("ScoreManager").GetComponent<ScoreManager>();
        pegSpawner = GameObject.Find("PegSpawner").GetComponent<PegSpawner>();

        // Check if the references are assigned properly, if not, log an error
        if (scoreManager == null)
        {
            Debug.LogError("ScoreManager is not found");
        }

        if (pegSpawner == null)
        {
            Debug.LogError("PegSpawner is not found");
        }
    }

    // Called when the ball collides with another object
    public void OnCollisionEnter2D(Collision2D collision)
    {
        // If the ball hits an Orange Peg, add the respective score and destroy the peg
        if (collision.collider.CompareTag("OrangePeg"))
        {
            Debug.Log("OrangePeg");
            scoreManager.AddScore(BaseScoreOrange); // Add orange peg score
            pegSpawner.totalOrangeCount -= 1; // Decrease the count of orange pegs
            Destroy(collision.collider.gameObject); // Destroy the orange peg
        }
        // If the ball hits a Green Peg, add the base score and destroy the peg
        else if (collision.collider.CompareTag("GreenPeg"))
        {
            Debug.Log("GreenPeg");
            scoreManager.AddScore(BaseScore); // Add base score for green peg
            Destroy(collision.collider.gameObject); // Destroy the green peg
        }
        // If the ball hits a Purple Peg, add the base score and destroy the peg
        else if (collision.collider.CompareTag("PurplePeg"))
        {
            Debug.Log("PurplePeg");
            scoreManager.AddScore(BaseScore); // Add base score for purple peg
            Destroy(collision.collider.gameObject); // Destroy the purple peg
        }
        // If the ball hits a Blue Peg, add the base score and destroy the peg
        else if (collision.collider.CompareTag("BluePeg"))
        {
            Debug.Log("BluePeg");
            scoreManager.AddScore(BaseScore); // Add base score for blue peg
            Destroy(collision.collider.gameObject); // Destroy the blue peg
        }
    }

    // Static method to calculate a multiplier based on the remaining orange pegs
    public static int GetMultiplier(int orangeCount)
    {
        Debug.Log(orangeCount); // Log the current count of orange pegs for debugging

        // Return multiplier based on the number of remaining orange pegs
        if (orangeCount <= 15 && orangeCount > 10)
        {
            return 2; // If between 11 and 15 orange pegs, multiplier is 2
        }
        else if (orangeCount <= 10 && orangeCount > 6)
        {
            return 3; // If between 7 and 10 orange pegs, multiplier is 3
        }
        else if (orangeCount <= 6 && orangeCount > 3)
        {
            return 5; // If between 4 and 6 orange pegs, multiplier is 5
        }
        else if (orangeCount <= 3 && orangeCount > 0)
        {
            return 10; // If between 1 and 3 orange pegs, multiplier is 10
        }
        else if (orangeCount <= 0)
        {
            return 100; // If no orange pegs remain, multiplier is 100
        }
        else
        {
            return 1; // Default multiplier is 1 if no special condition is met
        }
    }
}