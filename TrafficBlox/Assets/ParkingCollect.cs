using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ParkingCollect : MonoBehaviour
{
    private HudDisplay hudEvent;

    // Start is called before the first frame update
    void Start()
    {
        hudEvent = GetComponent<HudDisplay>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    private void OnCollisionEnter(Collision collision)
    {
        Debug.Log("PARKED");
        hudEvent.HudEvent("Parking");
      
    }
}
