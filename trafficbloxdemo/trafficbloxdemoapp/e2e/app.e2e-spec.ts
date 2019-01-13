/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for trafficbloxdemoapp', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be trafficbloxdemoapp', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('trafficbloxdemoapp');
    })
  });

  it('network-name should be trafficbloxdemo@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('trafficbloxdemo@0.0.1.bna');
    });
  });

  it('navbar-brand should be trafficbloxdemoapp',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('trafficbloxdemoapp');
    });
  });

  
    it('Contract component should be loadable',() => {
      page.navigateTo('/Contract');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Contract');
      });
    });

    it('Contract table should have 8 columns',() => {
      page.navigateTo('/Contract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('AccidentIncident component should be loadable',() => {
      page.navigateTo('/AccidentIncident');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AccidentIncident');
      });
    });

    it('AccidentIncident table should have 10 columns',() => {
      page.navigateTo('/AccidentIncident');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('BuyWayRequest component should be loadable',() => {
      page.navigateTo('/BuyWayRequest');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('BuyWayRequest');
      });
    });

    it('BuyWayRequest table should have 7 columns',() => {
      page.navigateTo('/BuyWayRequest');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('ParkingSpot component should be loadable',() => {
      page.navigateTo('/ParkingSpot');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ParkingSpot');
      });
    });

    it('ParkingSpot table should have 8 columns',() => {
      page.navigateTo('/ParkingSpot');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('Vehicle component should be loadable',() => {
      page.navigateTo('/Vehicle');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Vehicle');
      });
    });

    it('Vehicle table should have 4 columns',() => {
      page.navigateTo('/Vehicle');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('SpotUser component should be loadable',() => {
      page.navigateTo('/SpotUser');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SpotUser');
      });
    });

    it('SpotUser table should have 5 columns',() => {
      page.navigateTo('/SpotUser');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('VehicleOwner component should be loadable',() => {
      page.navigateTo('/VehicleOwner');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('VehicleOwner');
      });
    });

    it('VehicleOwner table should have 6 columns',() => {
      page.navigateTo('/VehicleOwner');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('SpotAdmin component should be loadable',() => {
      page.navigateTo('/SpotAdmin');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SpotAdmin');
      });
    });

    it('SpotAdmin table should have 6 columns',() => {
      page.navigateTo('/SpotAdmin');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Park component should be loadable',() => {
      page.navigateTo('/Park');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Park');
      });
    });
  
    it('Accident component should be loadable',() => {
      page.navigateTo('/Accident');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Accident');
      });
    });
  
    it('BuyWay component should be loadable',() => {
      page.navigateTo('/BuyWay');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('BuyWay');
      });
    });
  

});