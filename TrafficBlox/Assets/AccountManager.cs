using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AccountManager : MonoBehaviour
{

    private static int totalCoins=5000;
    private int remainingCoins;


    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public static void addCoins(int coins) {
        totalCoins += coins;
    
    }

    public static void substractCoins(int coins) {

        totalCoins -= coins;

    }

    public void updateCoins() { }


    public static int getTotalCoins() {

        return totalCoins; 
    }


}
