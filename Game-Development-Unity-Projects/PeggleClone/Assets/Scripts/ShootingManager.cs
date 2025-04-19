using System;
using System.Collections;
using UnityEngine;

public class ShootingManager : MonoBehaviour
{
    public GameObject ball;
    public Transform spawnPoint; 
    public Transform centerPoint; 
    public float radius = 5f; 
    public float shootForce = 10f; 

    private Vector3 mousePosition; 
    private float angle; 
    
    private GameManager gameManager; // Reference to GameManager
    

    public static ShootingManager Instance; 

    [Obsolete("Obsolete")]
    private void Awake()
    {
        // Singleton pattern
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject); // Prevent destruction on scene change
        }
        else
        {
            Destroy(gameObject); // Ensure only one ShootingManager exists
        }

        // Find the GameManager in the scene
        gameManager = FindObjectOfType<GameManager>();
        if (gameManager == null)
        {
            Debug.LogError("GameManager not found in the scene.");
        }
    }

    public void Update()
    {
        AimWithCursor();
        OnShoot();
    }

    private void AimWithCursor()
    {
        // Get the mouse position in world space
        mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);

        // Calculate the direction vector from the center point to the mouse position
        Vector2 direction = mousePosition - centerPoint.position;

        // Calculate angle (clamped to make sure it stays within the desired range)
        angle = Mathf.Atan2(direction.y, direction.x) * Mathf.Rad2Deg;
        angle = Mathf.Clamp(angle, -170f, 10f);

        // Update the spawn point position based on the clamped angle
        float radians = angle * Mathf.Deg2Rad;
        float x = centerPoint.position.x + Mathf.Cos(radians) * radius;
        float y = centerPoint.position.y + Mathf.Sin(radians) * radius;

        // Update the spawn point position
        spawnPoint.position = new Vector3(x, y, spawnPoint.position.z);
    }

    private void OnShoot()
    {
        if (gameManager != null && gameManager.bulletCount > 0)
        {
            if (Input.GetButtonDown("Fire1"))
            {
                Debug.Log("You Shoot!");
                if (ball != null && spawnPoint != null)
                {
                    gameManager.bulletCount -= 1; // Decrease the bullet count from GameManager
                    GameObject newBall = Instantiate(ball, spawnPoint.position, Quaternion.Euler(0, 0, angle));

                    Rigidbody2D rb = newBall.GetComponent<Rigidbody2D>();
                    if (rb != null)
                    {
                        // Apply force to the ball in the direction of the shoot
                        Vector2 shootDirection = new Vector2(Mathf.Cos(angle * Mathf.Deg2Rad),
                            Mathf.Sin(angle * Mathf.Deg2Rad));
                        rb.AddForce(shootDirection * shootForce, ForceMode2D.Impulse);
                    }

                    // Check if the ball goes out of bounds and destroy it
                    StartCoroutine(DestroyBallIfOutOfBounds(newBall));
                }
            }
        }
    }

    // Coroutine to check if the ball is off-screen and destroy it
    private IEnumerator DestroyBallIfOutOfBounds(GameObject ball)
    {
        // Wait until the next frame to give the ball time to move
        yield return null;

        // Check if the ball's position is out of the camera's view
        while (ball != null)
        {
            if (!IsBallInView(ball))
            {
                Destroy(ball); // Destroy the ball if it's out of the view
                break;
            }
            yield return null;
        }
    }

    // Check if the ball is within the camera's view
    private bool IsBallInView(GameObject ball)
    {
        Vector3 viewportPosition = Camera.main.WorldToViewportPoint(ball.transform.position);

        // Check if the ball is within the visible bounds (viewport values are between 0 and 1)
        return viewportPosition.x >= 0 && viewportPosition.x <= 1 && viewportPosition.y >= 0 && viewportPosition.y <= 1;
    }
}
