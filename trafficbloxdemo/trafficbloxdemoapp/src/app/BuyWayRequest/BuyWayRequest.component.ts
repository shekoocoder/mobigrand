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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BuyWayRequestService } from './BuyWayRequest.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-buywayrequest',
  templateUrl: './BuyWayRequest.component.html',
  styleUrls: ['./BuyWayRequest.component.css'],
  providers: [BuyWayRequestService]
})
export class BuyWayRequestComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  requestId = new FormControl('', Validators.required);
  driver = new FormControl('', Validators.required);
  waygivers = new FormControl('', Validators.required);
  vehicle = new FormControl('', Validators.required);
  waygiversVehicles = new FormControl('', Validators.required);
  coinsOffered = new FormControl('', Validators.required);

  constructor(public serviceBuyWayRequest: BuyWayRequestService, fb: FormBuilder) {
    this.myForm = fb.group({
      requestId: this.requestId,
      driver: this.driver,
      waygivers: this.waygivers,
      vehicle: this.vehicle,
      waygiversVehicles: this.waygiversVehicles,
      coinsOffered: this.coinsOffered
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceBuyWayRequest.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'io.trafficblox.intelligent.BuyWayRequest',
      'requestId': this.requestId.value,
      'driver': this.driver.value,
      'waygivers': this.waygivers.value,
      'vehicle': this.vehicle.value,
      'waygiversVehicles': this.waygiversVehicles.value,
      'coinsOffered': this.coinsOffered.value
    };

    this.myForm.setValue({
      'requestId': null,
      'driver': null,
      'waygivers': null,
      'vehicle': null,
      'waygiversVehicles': null,
      'coinsOffered': null
    });

    return this.serviceBuyWayRequest.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'requestId': null,
        'driver': null,
        'waygivers': null,
        'vehicle': null,
        'waygiversVehicles': null,
        'coinsOffered': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'io.trafficblox.intelligent.BuyWayRequest',
      'driver': this.driver.value,
      'waygivers': this.waygivers.value,
      'vehicle': this.vehicle.value,
      'waygiversVehicles': this.waygiversVehicles.value,
      'coinsOffered': this.coinsOffered.value
    };

    return this.serviceBuyWayRequest.updateAsset(form.get('requestId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceBuyWayRequest.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceBuyWayRequest.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'requestId': null,
        'driver': null,
        'waygivers': null,
        'vehicle': null,
        'waygiversVehicles': null,
        'coinsOffered': null
      };

      if (result.requestId) {
        formObject.requestId = result.requestId;
      } else {
        formObject.requestId = null;
      }

      if (result.driver) {
        formObject.driver = result.driver;
      } else {
        formObject.driver = null;
      }

      if (result.waygivers) {
        formObject.waygivers = result.waygivers;
      } else {
        formObject.waygivers = null;
      }

      if (result.vehicle) {
        formObject.vehicle = result.vehicle;
      } else {
        formObject.vehicle = null;
      }

      if (result.waygiversVehicles) {
        formObject.waygiversVehicles = result.waygiversVehicles;
      } else {
        formObject.waygiversVehicles = null;
      }

      if (result.coinsOffered) {
        formObject.coinsOffered = result.coinsOffered;
      } else {
        formObject.coinsOffered = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'requestId': null,
      'driver': null,
      'waygivers': null,
      'vehicle': null,
      'waygiversVehicles': null,
      'coinsOffered': null
      });
  }

}
