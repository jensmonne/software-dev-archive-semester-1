using UnityEngine;

// Enumeration representing the current display or rotation state of the card
public enum CardStatus
{
    show_back = 0,       // Card is showing its back side
    show_front,          // Card is showing its front side
    rotating_to_back,    // Card is rotating to show its back
    rotating_to_front    // Card is rotating to show its front
}

public class Cards : MonoBehaviour
{
    // Current status of the card
    [SerializeField] private CardStatus status;

    // Time it takes for the card to complete its rotation
    [SerializeField] private float turnTargetTime = 0.5f;

    // Timer to track the rotation progress
    private float turnTimer;

    // Starting and target rotations for card flipping
    private Quaternion startRotation;
    private Quaternion targetRotation;

    // SpriteRenderers for the front and back of the card
    private SpriteRenderer frontRenderer;
    private SpriteRenderer backRenderer;

    // Reference to the main game controller
    private Game game;

    // Called when the object is initialized
    private void Awake()
    {
        status = CardStatus.show_back; // Default state is showing the back

        GetFrontAndBackSpriteRenderers(); // Locate and set the front and back renderers

        game = FindObjectOfType<Game>(); // Find the main Game object
    }

    // Called once per frame
    private void Update()
    {
        // Handle card rotation animations
        if (status == CardStatus.rotating_to_front || status == CardStatus.rotating_to_back)
        {
            // Increment rotation timer
            turnTimer += Time.deltaTime;

            // Calculate the percentage of rotation completed
            float percentage = turnTimer / turnTargetTime;

            // Interpolate rotation using spherical linear interpolation
            transform.rotation = Quaternion.Slerp(startRotation, targetRotation, percentage);

            // If rotation is complete, update the status accordingly
            if (percentage >= 1.0f)
            {
                if (status == CardStatus.rotating_to_back)
                {
                    status = CardStatus.show_back; // Rotation to back complete
                }

                if (status == CardStatus.rotating_to_front)
                {
                    status = CardStatus.show_front; // Rotation to front complete
                }
            }
        }
    }

    // Rotates the card to show the front side
    private void TurnToFront()
    {
        status = CardStatus.rotating_to_front;
        turnTimer = 0f;
        startRotation = transform.rotation;
        targetRotation = Quaternion.Euler(0, 180, 0); // Target rotation for showing front
    }

    // Rotates the card to show the back side
    public void TurnToBack()
    {
        status = CardStatus.rotating_to_back;
        turnTimer = 0f;
        startRotation = transform.rotation;
        targetRotation = Quaternion.Euler(0, 0, 0); // Target rotation for showing back
    }

    // Locates the SpriteRenderers for the front and back of the card
    private void GetFrontAndBackSpriteRenderers()
    {
        foreach (Transform t in transform)
        {
            if (t.name == "Front")
            {
                frontRenderer = t.GetComponent<SpriteRenderer>();
            }

            if (t.name == "Back")
            {
                backRenderer = t.GetComponent<SpriteRenderer>();
            }
        }
    }

    // Sets the sprite for the front of the card
    public void SetFront(Sprite sprite)
    {
        if (frontRenderer != null)
        {
            frontRenderer.sprite = sprite;
        }
    }

    // Sets the sprite for the back of the card
    public void SetBack(Sprite sprite)
    {
        if (backRenderer != null)
        {
            backRenderer.sprite = sprite;
        }
    }

    // Retrieves the size of the front sprite
    public Vector2 GetFrontSize()
    {
        if (frontRenderer == null)
        {
            Debug.LogError("No frontRenderer found");
        }
        return frontRenderer.bounds.size;
    }

    // Retrieves the size of the back sprite
    public Vector2 GetBackSize()
    {
        if (backRenderer == null)
        {
            Debug.LogError("No backRenderer found");
        }
        return backRenderer.bounds.size;
    }

    // Handles card selection when clicked
    private void OnMouseUp()
    {
        // Check if the card is allowed to be selected
        if (game.AllowedToSelectCard(this))
        {
            if (status == CardStatus.show_back)
            {
                game.SelectCard(gameObject); // Notify game of card selection
                TurnToFront(); // Flip the card to show the front
            }

            if (status == CardStatus.show_front)
            {
                TurnToBack(); // Flip the card to show the back
            }
        }
    }
}