using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Teleporter : MonoBehaviour
{
    public int teleporterID; // Unique identifier for this teleporter
    public TMP_Text teleportingText; // Reference to the UI Text element to display teleport countdown

    private void OnTriggerEnter2D(Collider2D other)
    {
        // Check if the object entering the trigger zone has the tag "Player"
        if (other.CompareTag("Player"))
        {
            // Check if this teleporter has the correct ID for teleporting
            if (teleporterID == 1)
            {
                // Start the teleportation coroutine
                StartCoroutine(HandleTeleporter());

                // Start the countdown display coroutine
                StartCoroutine(DisplayTeleportTime(3)); // 3 seconds countdown
            }
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        // Stop all running coroutines when the player exits the teleporter zone
        StopAllCoroutines();

        // Hide the teleporting text UI
        teleportingText.gameObject.SetActive(false);
    }

    private IEnumerator HandleTeleporter()
    {
        // Wait for 3 seconds (teleportation delay)
        yield return new WaitForSeconds(3f);

        // Load the target scene ("Dungeon_1")
        SceneManager.LoadScene("Dungeon_1");
    }

    private IEnumerator DisplayTeleportTime(int countdownTime)
    {
        // Make the teleporting text UI element visible
        teleportingText.gameObject.SetActive(true);

        // Loop to update the countdown text
        while (countdownTime > 0)
        {
            // Update the text with the remaining countdown time
            teleportingText.text = "Teleporting in " + countdownTime + "...";

            // Wait for 1 second
            yield return new WaitForSeconds(1f);

            // Decrease the countdown time
            countdownTime--;
        }

        // Update the text to indicate immediate teleportation
        teleportingText.text = "Teleporting now...";
    }
}