using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HudDisplay : MonoBehaviour
{
    public ExampleType m_Type;
    private bl_HUDText HUDRoot;
 
    void Awake()
    {
        HUDRoot = bl_UHTUtils.GetHUDText;
     }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {

    }

   public void HudEvent(string hudEventType) {

        switch (hudEventType)
        {
            case "Accident":
                int coins = Random.Range(50, 200);
                HUDTextInfo info = new HUDTextInfo(transform, string.Format("- {0}", coins.ToString()));
                info.Size = Random.Range(100, 150);
                info.Color = Color.green;
                info.VerticalPositionOffset = 3;
                HUDRoot.NewText(info);
                AccountManager.substractCoins(coins);
                break;
            case "Parking":
                //Build the information
                int parkingCost = Random.Range(50, 100);
                HUDTextInfo info2 = new HUDTextInfo(transform, "- " + parkingCost);
                info2.Color = Color.red;
                info2.Size = Random.Range(60, 150);
                info2.Speed = Random.Range(10, 20);
                info2.VerticalAceleration = -1;
                info2.VerticalFactorScale = Random.Range(1.2f, 3);
                info2.VerticalPositionOffset = 3;
                info2.Side = (Random.Range(0, 2) == 1) ? bl_Guidance.RightDown : bl_Guidance.LeftDown;
                //Send the information
                HUDRoot.NewText(info2);
                AccountManager.substractCoins(parkingCost);
                break;
            case "BuyWay":
                //Build the information               
                string t = "Bought way";
                HUDTextInfo info3 = new HUDTextInfo(transform, t);
                info3.Color = Color.magenta;
                info3.Size = Random.Range(100, 130);
                info3.Speed = Random.Range(10, 20);
                info3.VerticalAceleration = 1;
                info3.VerticalFactorScale = Random.Range(1.2f, 3);
                info3.Side = bl_Guidance.Up;
                info3.VerticalPositionOffset = 3;
                info3.AnimationSpeed = 0.5f;
                info3.ExtraDelayTime = 2;
                info3.FadeSpeed = 400;
                //Send the information
                HUDRoot.NewText(info3);
                AccountManager.substractCoins(20);
                break;
            default:
                Debug.Log("Unknow type");
                break;
        }


    }

    [System.Serializable]
    public enum ExampleType
    {
        Accident,
        Parking,
        BuyWay,
    }
}
