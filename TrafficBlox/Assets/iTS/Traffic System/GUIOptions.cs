using UnityEngine;
using System.Collections;

public class GUIOptions : MonoBehaviour {

	TSTrafficSpawner spawner;
	float totalCars;
    private HudDisplay hudEvent;

    // Use this for initialization
    void Start () {
		spawner = GameObject.FindObjectOfType<TSTrafficSpawner>();
		totalCars = spawner.TrafficCars.Length;
        hudEvent = GetComponent<HudDisplay>();
    }
	
	void OnGUI(){
		GUI.Label(new Rect(10,Screen.height-45,350,25),"Target Amount of cars: " + spawner.amount.ToString());
		GUI.Label(new Rect(10,Screen.height-25,350,25),"Actual Amount of cars on scene: " + (totalCars - spawner.totalFarCars).ToString());
		spawner.amount = Mathf.RoundToInt( GUI.HorizontalSlider(new Rect(10,Screen.height-55,250,25),spawner.amount,0,totalCars));

		GUI.Label(new Rect(10,Screen.height-110,350,25),"Respawn Time " + spawner.respawnUpSideDownTime.ToString());
		spawner.respawnUpSideDownTime =  GUI.HorizontalSlider(new Rect(120,Screen.height-110,100,25),spawner.respawnUpSideDownTime,0f,20f);
		spawner.respawnIfUpSideDown = GUI.Toggle(new Rect(10,Screen.height-90,250,25),spawner.respawnIfUpSideDown,"Auto Respawn upside down cars?");

        GUI.Label(new Rect(10, Screen.height - 250, 350, 25), "Crypto Coins Total = " + AccountManager.getTotalCoins());

        if (GUI.Button(new Rect(10, Screen.height - 150, 350, 25), "Buy Way")) { 
            hudEvent.HudEvent("BuyWay");
            spawner.amount = 7;
            
         }

        if (GUI.Button(new Rect(10, Screen.height - 190, 350, 25), "Pay Parking"))
        {
            hudEvent.HudEvent("Parking");
            AccountManager.substractCoins(150);
        }



    }
}
