using UnityEngine;

public class CameraNoRotation : MonoBehaviour
{
    private Quaternion initialRotation; // Stores the camera's initial rotation

    void Start()
    {
        // Save the initial rotation of the camera when the scene starts
        initialRotation = transform.rotation;
    }

    void LateUpdate()
    {
        // Reset the camera's rotation to its initial value every frame
        // This prevents the camera from rotating even if the parent object rotates
        transform.rotation = initialRotation;
    }
}