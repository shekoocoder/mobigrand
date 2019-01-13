using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Net;
using System;
using System.IO;

public class WalletManager : MonoBehaviour
{
    private const string API_KEY = "88169749096b61e3b85398905927f53c";
    private const float API_CHECK_MAXTIME = 10 * 60.0f; //10 minutes
    public string WalletId;
    private float apiCheckCountdown = API_CHECK_MAXTIME;


    [Serializable]
    public class Wallet
    {
        public int id;
        public string main;
    }
    [Serializable]
    public class WalletInfo
    {
        public int id;
        public string name;
        public List<Wallet> weather;
    }


    [Serializable]
    public class ContactDetails
    {
        public string email ;
        public string mobilePhone;
        public Address address ;
   }

    [Serializable]
    public class InsuranceDetails
    {
        public string email;
        public string mobilePhone;
        public string insurance;
        public Address address ;
   }
    [Serializable]
    public class Address
    {
        public string street ;
        public string city;
        public string state;
        public string country;
        public string zip;
   }

    [Serializable]
    public class SpotFeatures
    {
        public Boolean covered;
        public Boolean selfPark;
        public int timeSlot;
        public Boolean handicapAccessible;
   }
    [Serializable]
    public enum SpotRating
    {
        POOR,
        AVERAGE,
        GOOD,
        GREAT,
    }
    [Serializable]
    public enum AccidentType
    {
        ROLLOVER,
        REAREND,
        SIDEIMPACT,
        HEADON,
    }

    void Start()
    {
 
    }
    void Update()
    {
        apiCheckCountdown -= Time.deltaTime;
        if (apiCheckCountdown <= 0)
        {
            apiCheckCountdown = API_CHECK_MAXTIME;
        }
    }


    private WalletInfo GetWallet()
    {
        HttpWebRequest request =
        (HttpWebRequest)WebRequest.Create(String.Format("http://localhost?id={0}&APPID={1}",
         WalletId, API_KEY));
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        StreamReader reader = new StreamReader(response.GetResponseStream());
        string jsonResponse = reader.ReadToEnd();
        WalletInfo info = JsonUtility.FromJson<WalletInfo>(jsonResponse);
        return info;
    }


}
