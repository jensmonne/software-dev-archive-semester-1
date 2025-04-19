using UnityEngine;
using System.Collections.Generic;

// Enum representing the game states during card selection and matching
enum GameStatus
{
    waiting_on_first_card,
    waiting_on_second_card,
    match_found,
    no_match_found
}

public class Game : MonoBehaviour
{
    // Game grid dimensions
    [SerializeField] private int columns = 4;
    [SerializeField] private int rows = 4;

    // Total number of pairs of cards
    [SerializeField] private float totalPairs;

    // Paths to the sprite folders for front and back sides
    [SerializeField] private string frontSidesFolder = "Sprites/frontSides";
    [SerializeField] private string backSidesFolder = "Sprites/backSides";

    // Arrays holding all possible front and back sprites
    [SerializeField] private Sprite[] frontSprites;
    [SerializeField] private Sprite[] backSprites;

    // Selected sprites for the game
    [SerializeField] private Sprite selectedBackSprite;
    [SerializeField] private List<Sprite> selectedFrontSprites;

    // Card prefab to instantiate
    [SerializeField] private GameObject cardPrefab;

    // Stack to hold all card GameObjects before placement
    private Stack<GameObject> stackOfCards;

    // Array to store placed cards in the grid
    private GameObject[,] placedCards;

    // Anchor for the grid layout and spacing between cards
    [SerializeField] private Transform fieldAnchor;
    [SerializeField] private float offsetX;
    [SerializeField] private float offsetY;

    // Game status and card selection tracking
    [SerializeField] private GameStatus status;
    [SerializeField] private GameObject[] selectedCards;

    // Timer for delaying actions when matching or rotating back cards
    private float timeoutTimer;
    [SerializeField] private float timeoutTarget;

    // Initialization of the game
    private void Start()
    {
        MakeCards(); // Create and set up the cards
        DistributeCards(); // Place cards on the grid

        // Initialize game state and selected card array
        selectedCards = new GameObject[2];
        status = GameStatus.waiting_on_first_card;
    }

    // Updates game logic based on the current status
    private void Update()
    {
        if (status == GameStatus.no_match_found || status == GameStatus.match_found)
        {
            RotateBackOrRemovePair(); // Handle card actions based on match or mismatch
        }
    }

    // Creates and prepares cards for the game
    private void MakeCards()
    {
        CalculateAmountOfPairs();
        LoadSprites();
        SelectFrontSprites();
        SelectBackSprite();
        ConstructCards();
    }

    // Handles card placement on the grid
    private void DistributeCards()
    {
        placedCards = new GameObject[columns, rows];
        ShuffleCards();
        PlaceCardsOnField();
    }

    // Calculates the number of pairs based on the grid size
    private void CalculateAmountOfPairs()
    {
        if (rows * columns % 2 == 0)
        {
            totalPairs = columns * rows / 2;
        }
        else
        {
            Debug.LogError("Not a valid amount of pairs");
        }
    }

    // Loads all available front and back sprites from the specified folders
    private void LoadSprites()
    {
        frontSprites = Resources.LoadAll<Sprite>(frontSidesFolder);
        backSprites = Resources.LoadAll<Sprite>(backSidesFolder);
    }

    // Randomly selects a set of front sprites for the game
    private void SelectFrontSprites()
    {
        if (frontSprites.Length < totalPairs)
        {
            Debug.LogError("Not enough sprites to create " + totalPairs + " pairs.");
        }

        selectedFrontSprites = new List<Sprite>();

        // Ensure unique sprites are selected
        while (selectedFrontSprites.Count < totalPairs)
        {
            int rnd = Random.Range(0, frontSprites.Length);
            if (!selectedFrontSprites.Contains(frontSprites[rnd]))
            {
                selectedFrontSprites.Add(frontSprites[rnd]);
            }
        }
    }

    // Randomly selects one back sprite for all cards
    private void SelectBackSprite()
    {
        if (backSprites.Length > 0)
        {
            int rnd = Random.Range(0, backSprites.Length);
            selectedBackSprite = backSprites[rnd];
        }
        else
        {
            Debug.LogError("No back sprites available to select.");
        }
    }

    // Constructs card GameObjects with their front and back sprites
    private void ConstructCards()
    {
        stackOfCards = new Stack<GameObject>();

        foreach (Sprite frontSprite in selectedFrontSprites)
        {
            for (int i = 0; i < 2; i++) // Two cards per pair
            {
                GameObject card = Instantiate(cardPrefab);
                Cards cardScript = card.GetComponent<Cards>();

                cardScript.SetBack(selectedBackSprite);
                cardScript.SetFront(frontSprite);

                card.name = frontSprite.name;
                stackOfCards.Push(card);
            }
        }
    }

    // Shuffles the cards by placing them randomly in the grid
    private void ShuffleCards()
    {
        while (stackOfCards.Count > 0)
        {
            int randX = Random.Range(0, columns);
            int randY = Random.Range(0, rows);

            if (placedCards[randX, randY] == null)
            {
                placedCards[randX, randY] = stackOfCards.Pop();
            }
        }
    }

    // Places shuffled cards on the field with proper spacing
    private void PlaceCardsOnField()
    {
        for (int y = 0; y < rows; y++)
        {
            for (int x = 0; x < columns; x++)
            {
                GameObject card = placedCards[x, y];
                Cards cardScript = card.GetComponent<Cards>();

                Vector2 cardSize = cardScript.GetBackSize();

                float posX = fieldAnchor.position.x + (x * (cardSize.x + offsetX));
                float posY = fieldAnchor.position.y + (y * (cardSize.y + offsetY));

                placedCards[x, y].transform.position = new Vector3(posX, posY, 0f);
            }
        }
    }

    // Handles card selection logic
    public void SelectCard(GameObject card)
    {
        if (status == GameStatus.waiting_on_first_card)
        {
            selectedCards[0] = card;
            status = GameStatus.waiting_on_second_card;
        }
        else if (status == GameStatus.waiting_on_second_card)
        {
            selectedCards[1] = card;
            checkForMatchingPair();
        }
    }

    // Checks if the two selected cards are a matching pair
    private void checkForMatchingPair()
    {
        timeoutTimer = 0f;

        if (selectedCards[0].name == selectedCards[1].name)
        {
            status = GameStatus.match_found;
        }
        else
        {
            status = GameStatus.no_match_found;
        }
    }

    // Rotates mismatched cards back or removes matching pairs
    private void RotateBackOrRemovePair()
    {
        timeoutTimer += Time.deltaTime;

        if (timeoutTimer >= timeoutTarget)
        {
            if (status == GameStatus.match_found)
            {
                selectedCards[0].SetActive(false);
                selectedCards[1].SetActive(false);
            }
            else if (status == GameStatus.no_match_found)
            {
                selectedCards[0].GetComponent<Cards>().TurnToBack();
                selectedCards[1].GetComponent<Cards>().TurnToBack();
            }

            selectedCards[0] = null;
            selectedCards[1] = null;

            status = GameStatus.waiting_on_first_card;
        }
    }

    // Determines if a card is allowed to be selected
    public bool AllowedToSelectCard(Cards card)
    {
        if (selectedCards[0] == null)
        {
            return true;
        }

        if (selectedCards[1] == null && selectedCards[0] != card.gameObject)
        {
            return true;
        }

        return false;
    }
}
