using System.Collections.Generic;
using UnityEngine;

public class ShipSpawner : MonoBehaviour
{
    // List of ship prefabs to spawn
    [SerializeField] private List<GameObject> Ships = new List<GameObject>();
    // Time interval between each spawn
    [SerializeField] private float spawnInterval = 1f;

    // Called when the script is first initialized
    private void Start()
    {
        // Repeatedly call the SpawnShip method starting immediately
        InvokeRepeating("SpawnShip", 0f, spawnInterval);
    }

    // Method to spawn a random ship at a random vertical position
    private void SpawnShip()
    {
        // Select a random ship prefab from the list
        int randomIndex = Random.Range(0, Ships.Count);
        GameObject shipPrefab = Ships[randomIndex];

        // Generate a random Y position within the range for ship spawning
        float spawnYPos = Random.Range(-4.5f, 4.5f);

        // Set the rotation of the spawned ship (90 degrees rotation around the Z-axis)
        Quaternion rotation = Quaternion.Euler(0f, 0f, 90f);

        // Create a new instance of the ship at the desired position and rotation
        Instantiate(shipPrefab, new Vector3(23f, spawnYPos, 0f), rotation);
    }
}