using System.Collections;
using UnityEngine;

public class PlayerBehaviour : MonoBehaviour
{
    public GameObject projectile; // Reference to the projectile prefab
    public GameManager gm; // Reference to the GameManager script

    private bool canTrigger = true; // Determines if health can be triggered on collision
    private bool canShoot = true; // Determines if the player can shoot

    private void Update()
    {
        // Check for input to spawn a projectile
        // Uncomment to use a keyboard key instead: Input.GetKeyDown(KeyCode.E)
        if (Input.GetMouseButton(0)) // Left mouse button
        {
            SpawnProjectile();
        }
    }

    private void SpawnProjectile()
    {
        // Set the position where the projectile will spawn (at the player's position)
        Vector3 spawnPosition = transform.position;

        // Rotate the projectile to align with the player's orientation, adjusted by 90 degrees
        Quaternion spawnRotation = transform.rotation * Quaternion.Euler(0, 0, 90);

        // Check if shooting is allowed
        if (canShoot)
        {
            // Instantiate the projectile at the spawn position and rotation
            Instantiate(projectile, spawnPosition, spawnRotation);

            // Start cooldown coroutine to delay next shot
            StartCoroutine(HandleProjectileDelay());
        }
    }

    private void OnCollisionStay2D(Collision2D collision)
    {
        // Check if the player is colliding with an object tagged "Enemy"
        if (collision.gameObject.CompareTag("Enemy") && canTrigger)
        {
            // Start the collision handling coroutine
            StartCoroutine(HandleCollisionDelay());
        }
    }

    private IEnumerator HandleCollisionDelay()
    {
        // Prevent repeated triggering during the cooldown
        canTrigger = false;

        // Signal the GameManager to handle a health trigger
        gm.hpTrigger = true;

        // Wait for 0.4 seconds before allowing another health trigger
        yield return new WaitForSeconds(0.4f);

        // Reset the health trigger and re-enable collision handling
        gm.hpTrigger = false;
        canTrigger = true;
    }

    private IEnumerator HandleProjectileDelay()
    {
        // Prevent shooting during the cooldown
        canShoot = false;

        // Wait for 0.25 seconds before allowing another shot
        yield return new WaitForSeconds(0.25f);

        // Re-enable shooting
        canShoot = true;
    }
}