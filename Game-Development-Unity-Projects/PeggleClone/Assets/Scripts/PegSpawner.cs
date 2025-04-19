using System;
using UnityEngine;

public class PegSpawner : MonoBehaviour
{
    // Arrays to hold the different peg prefabs and spawn points
    public GameObject[] pegPrefabs;
    public Transform[] spawnPoints;
    
    // Variables to track the number of different types of pegs
    public int orangeCount;
    public int greenCount = 2;
    public int purpleCount = 1;

    // Total number of orange pegs (used to track how many remain to be spawned)
    public int totalOrangeCount;

    // Called when the script starts (initialization)
    private void Start()
    {
        // Calculate the number of orange pegs based on the number of spawn points
        float spawnPointCount = spawnPoints.Length;
        float incOrange = spawnPointCount / 5;
        orangeCount = (int)Math.Ceiling(incOrange); // Ensure a rounded up number of orange pegs
        totalOrangeCount = orangeCount; // Store the original number of orange pegs

        // Shuffle the spawn points to randomize the spawning of pegs
        ShuffleSpawnPoints();
        
        // Spawn the pegs in the shuffled positions
        SpawnPegs();
    }

    // Method to spawn the pegs at the given spawn points
    private void SpawnPegs()
    {
        // Iterate through each spawn point to place a peg
        foreach (Transform spawnPoint in spawnPoints)
        {
            Vector2 spawnPosition = spawnPoint.position; // Get the position of the spawn point

            GameObject pegToSpawn; // Variable to hold the peg prefab to spawn
            
            // Check and choose which type of peg to spawn based on available counts
            if (orangeCount > 0)
            {
                pegToSpawn = pegPrefabs[1]; // Select the orange peg prefab (index 1)
                orangeCount--; // Decrease the count of orange pegs left
            }
            else if (greenCount > 0)
            {
                pegToSpawn = pegPrefabs[2]; // Select the green peg prefab (index 2)
                greenCount--; // Decrease the count of green pegs left
            }
            else if (purpleCount > 0)
            {
                pegToSpawn = pegPrefabs[3]; // Select the purple peg prefab (index 3)
                purpleCount--; // Decrease the count of purple pegs left
            }
            else
            {
                pegToSpawn = pegPrefabs[0]; // Select the default peg (index 0) if no colored pegs remain
            }

            // Instantiate the selected peg at the spawn position
            Instantiate(pegToSpawn, spawnPosition, Quaternion.identity);
        }
    }
    
    // Method to shuffle the spawn points array to randomize peg placement
    private void ShuffleSpawnPoints()
    {
        // Perform a simple random shuffle on the spawn points array
        for (int i = 0; i < spawnPoints.Length; i++)
        {
            // Select a random index within the range of spawn points
            int randomIndex = UnityEngine.Random.Range(0, spawnPoints.Length);
            
            // Swap the current spawn point with the one at the random index
            (spawnPoints[i], spawnPoints[randomIndex]) = (spawnPoints[randomIndex], spawnPoints[i]);
        }
    }
}