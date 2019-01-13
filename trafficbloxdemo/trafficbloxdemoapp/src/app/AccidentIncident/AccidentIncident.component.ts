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
import { AccidentIncidentService } from './AccidentIncident.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-accidentincident',
  templateUrl: './AccidentIncident.component.html',
  styleUrls: ['./AccidentIncident.component.css'],
  providers: [AccidentIncidentService]
})
export class AccidentIncidentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  accidentId = new FormControl('', Validators.required);
  registrant = new FormControl('', Validators.required);
  driver = new FormControl('', Validators.required);
  victim = new FormControl('', Validators.required);
  vehicle = new FormControl('', Validators.required);
  victimVehicle = new FormControl('', Validators.required);
  accidentDateTime = new FormControl('', Validators.required);
  accidentType = new FormControl('', Validators.required);
  accidentLocation = new FormControl('', Validators.required);

  constructor(public serviceAccidentIncident: AccidentIncidentService, fb: FormBuilder) {
    this.myForm = fb.group({
      accidentId: this.accidentId,
      registrant: this.registrant,
      driver: this.driver,
      victim: this.victim,
      vehicle: this.vehicle,
      victimVehicle: this.victimVehicle,
      accidentDateTime: this.accidentDateTime,
      accidentType: this.accidentType,
      accidentLocation: this.accidentLocation
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceAccidentIncident.getAll()
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
      $class: 'io.trafficblox.intelligent.AccidentIncident',
      'accidentId': this.accidentId.value,
      'registrant': this.registrant.value,
      'driver': this.driver.value,
      'victim': this.victim.value,
      'vehicle': this.vehicle.value,
      'victimVehicle': this.victimVehicle.value,
      'accidentDateTime': this.accidentDateTime.value,
      'accidentType': this.accidentType.value,
      'accidentLocation': this.accidentLocation.value
    };

    this.myForm.setValue({
      'accidentId': null,
      'registrant': null,
      'driver': null,
      'victim': null,
      'vehicle': null,
      'victimVehicle': null,
      'accidentDateTime': null,
      'accidentType': null,
      'accidentLocation': null
    });

    return this.serviceAccidentIncident.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'accidentId': null,
        'registrant': null,
        'driver': null,
        'victim': null,
        'vehicle': null,
        'victimVehicle': null,
        'accidentDateTime': null,
        'accidentType': null,
        'accidentLocation': null
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
      $class: 'io.trafficblox.intelligent.AccidentIncident',
      'registrant': this.registrant.value,
      'driver': this.driver.value,
      'victim': this.victim.value,
      'vehicle': this.vehicle.value,
      'victimVehicle': this.victimVehicle.value,
      'accidentDateTime': this.accidentDateTime.value,
      'accidentType': this.accidentType.value,
      'accidentLocation': this.accidentLocation.value
    };

    return this.serviceAccidentIncident.updateAsset(form.get('accidentId').value, this.asset)
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

    return this.serviceAccidentIncident.deleteAsset(this.currentId)
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

    return this.serviceAccidentIncident.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'accidentId': null,
        'registrant': null,
        'driver': null,
        'victim': null,
        'vehicle': null,
        'victimVehicle': null,
        'accidentDateTime': null,
        'accidentType': null,
        'accidentLocation': null
      };

      if (result.accidentId) {
        formObject.accidentId = result.accidentId;
      } else {
        formObject.accidentId = null;
      }

      if (result.registrant) {
        formObject.registrant = result.registrant;
      } else {
        formObject.registrant = null;
      }

      if (result.driver) {
        formObject.driver = result.driver;
      } else {
        formObject.driver = null;
      }

      if (result.victim) {
        formObject.victim = result.victim;
      } else {
        formObject.victim = null;
      }

      if (result.vehicle) {
        formObject.vehicle = result.vehicle;
      } else {
        formObject.vehicle = null;
      }

      if (result.victimVehicle) {
        formObject.victimVehicle = result.victimVehicle;
      } else {
        formObject.victimVehicle = null;
      }

      if (result.accidentDateTime) {
        formObject.accidentDateTime = result.accidentDateTime;
      } else {
        formObject.accidentDateTime = null;
      }

      if (result.accidentType) {
        formObject.accidentType = result.accidentType;
      } else {
        formObject.accidentType = null;
      }

      if (result.accidentLocation) {
        formObject.accidentLocation = result.accidentLocation;
      } else {
        formObject.accidentLocation = null;
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
      'accidentId': null,
      'registrant': null,
      'driver': null,
      'victim': null,
      'vehicle': null,
      'victimVehicle': null,
      'accidentDateTime': null,
      'accidentType': null,
      'accidentLocation': null
      });
  }

}
