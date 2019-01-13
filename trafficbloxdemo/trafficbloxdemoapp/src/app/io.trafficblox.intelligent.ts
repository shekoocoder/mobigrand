import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace io.trafficblox.intelligent{
   export class ContactDetails {
      email: string;
      mobilePhone: string;
      address: Address;
   }
   export class InsuranceDetails {
      email: string;
      mobilePhone: string;
      insurance: string;
      address: Address;
   }
   export class Address {
      street: string;
      city: string;
      state: string;
      country: string;
      zip: string;
   }
   export class SpotFeatures {
      covered: boolean;
      selfPark: boolean;
      timeSlot: number;
      handicapAccessible: boolean;
   }
   export enum SpotRating {
      POOR,
      AVERAGE,
      GOOD,
      GREAT,
   }
   export enum AccidentType {
      ROLLOVER,
      REAREND,
      SIDEIMPACT,
      HEADON,
   }
   export class SpotUser extends Participant {
      userId: string;
      firstName: string;
      lastName: string;
      contactDetails: ContactDetails;
   }
   export class VehicleOwner extends Participant {
      ownerId: string;
      firstName: string;
      lastName: string;
      insuranceDetails: InsuranceDetails;
      contactDetails: ContactDetails;
   }
   export class SpotAdmin extends SpotUser {
      authorized: string[];
   }
   export class Contract extends Asset {
      contractId: string;
      renter: SpotUser;
      owner: SpotUser;
      spot: ParkingSpot;
      vehicle: Vehicle;
      arrivalDateTime: Date;
      numHours: number;
   }
   export class AccidentIncident extends Asset {
      accidentId: string;
      registrant: VehicleOwner;
      driver: SpotUser;
      victim: VehicleOwner;
      vehicle: Vehicle;
      victimVehicle: Vehicle;
      accidentDateTime: Date;
      accidentType: AccidentType;
      accidentLocation: string;
   }
   export class BuyWayRequest extends Asset {
      requestId: string;
      driver: VehicleOwner;
      waygivers: VehicleOwner[];
      vehicle: Vehicle;
      waygiversVehicles: Vehicle[];
      coinsOffered: number;
   }
   export class ParkingSpot extends Asset {
      parkingSpotID: string;
      address: Address;
      coordinates: string;
      ratePerHour: number;
      spotRating: SpotRating;
      features: SpotFeatures;
      owner: SpotUser;
   }
   export class Vehicle extends Asset {
      vin: string;
      licensePlate: string;
      owner: SpotUser;
   }
   export class Park extends Transaction {
      contract: Contract;
   }
   export class Accident extends Transaction {
      accident: AccidentIncident;
   }
   export class BuyWay extends Transaction {
      buywayRequest: BuyWayRequest;
   }
// }
