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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ContractComponent } from './Contract/Contract.component';
import { AccidentIncidentComponent } from './AccidentIncident/AccidentIncident.component';
import { BuyWayRequestComponent } from './BuyWayRequest/BuyWayRequest.component';
import { ParkingSpotComponent } from './ParkingSpot/ParkingSpot.component';
import { VehicleComponent } from './Vehicle/Vehicle.component';

import { SpotUserComponent } from './SpotUser/SpotUser.component';
import { VehicleOwnerComponent } from './VehicleOwner/VehicleOwner.component';
import { SpotAdminComponent } from './SpotAdmin/SpotAdmin.component';

import { ParkComponent } from './Park/Park.component';
import { AccidentComponent } from './Accident/Accident.component';
import { BuyWayComponent } from './BuyWay/BuyWay.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Contract', component: ContractComponent },
  { path: 'AccidentIncident', component: AccidentIncidentComponent },
  { path: 'BuyWayRequest', component: BuyWayRequestComponent },
  { path: 'ParkingSpot', component: ParkingSpotComponent },
  { path: 'Vehicle', component: VehicleComponent },
  { path: 'SpotUser', component: SpotUserComponent },
  { path: 'VehicleOwner', component: VehicleOwnerComponent },
  { path: 'SpotAdmin', component: SpotAdminComponent },
  { path: 'Park', component: ParkComponent },
  { path: 'Accident', component: AccidentComponent },
  { path: 'BuyWay', component: BuyWayComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
