'use strict';

const AdminConnection = require('composer-admin').AdminConnection;
const BrowserFS = require('browserfs/dist/node/index');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const path = require('path');

require('chai').should();

const bfs_fs = BrowserFS.BFSRequire('fs');
const NS = 'io.ethventures.thespot';

describe('Traffic Blox', () => {

    // let adminConnection;
    let businessNetworkConnection;

    before(() => {
        BrowserFS.initialize(new BrowserFS.FileSystem.InMemory());
        const adminConnection = new AdminConnection({ fs: bfs_fs });
        return adminConnection.createProfile('defaultProfile', {
            type: 'embedded'
        })
            .then(() => {
                return adminConnection.connect('defaultProfile', 'admin', 'adminpw');
            })
            .then(() => {
                return BusinessNetworkDefinition.fromDirectory(path.resolve(__dirname, '..'));
            })
            .then((businessNetworkDefinition) => {
                return adminConnection.deploy(businessNetworkDefinition);
            })
            .then(() => {
                businessNetworkConnection = new BusinessNetworkConnection({ fs: bfs_fs });
                return businessNetworkConnection.connect('defaultProfile', 'spot-network', 'admin', 'adminpw');
            });
    });

    describe('#parkOnSpot', () => {

        it('should be able to park on a parkingspot', () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create the owner/renter
            const dan = factory.newResource(NS, 'SpotUser', 'dan@email.com');
            dan.firstName = 'Dan';
            dan.lastName = 'Selman';

            const simon = factory.newResource(NS, 'SpotUser', 'simon@email.com');
            simon.firstName = 'Simon';
            simon.lastName = 'Stone';

            // create the parkingspot
            const parkingspot = factory.newResource(NS, 'ParkingSpot', '123 Maple');
            parkingspot.owner = factory.newRelationship(NS, 'SpotUser', dan.$identifier);

            // create simon vehicle
            const jeep = factory.newResource(NS, 'Vehicle', 'Jeep');
            jeep.licensePlate = 'RS61KR';
            jeep.owner = factory.newRelationship(NS, 'SpotUser', simon.$identifier);

            // create the contract
            const contract = factory.newResource(NS, 'Contract', 'Alpha');
            contract.owner = factory.newRelationship(NS, 'SpotUser', dan.$identifier);
            contract.renter = factory.newRelationship(NS, 'SpotUser', simon.$identifier);
            contract.spot = factory.newRelationship(NS, 'ParkingSpot', parkingspot.$identifier);
            contract.vehicle = factory.newRelationship(NS, 'Vehicle', jeep.$identifier);
            contract.numHours = 1;


            // create the reserve transaction
            const reserve = factory.newTransaction(NS, 'Reserve');
            reserve.contract = factory.newRelationship(NS, 'Contract', contract.$identifier);



            // the owner should of the parkingspot should be dan
            parkingspot.owner.$identifier.should.equal(dan.$identifier);


            // Get the asset registry.
            return businessNetworkConnection.getAssetRegistry(NS + '.Contract')
                .then((assetRegistry) => {

                    // add the contract to the asset registry.
                    return assetRegistry.add(contract)
                        .then(() => {
                            return businessNetworkConnection.getParticipantRegistry(NS + '.SpotUser');
                        })
                        .then((participantRegistry) => {
                            // add the reservers
                            return participantRegistry.addAll([dan, simon]);
                        })
                        .then(() => {
                            // submit the transaction
                            return businessNetworkConnection.submitTransaction(reserve);
                        })
                        .then(() => {
                            return businessNetworkConnection.getAssetRegistry(NS + '.Contract');
                        })
                        .then((assetRegistry) => {
                            // re-get the contract
                            return assetRegistry.get(contract.$identifier);
                        })
                        .then((newContract) => {
                            // the renter on the contract should not be simon
                            newContract.renter.$identifier.should.equal(simon.$identifier);
                            // the spotowner on the contract should be dan
                            newContract.owner.$identifier.should.equal(dan.$identifier);
                        });
                });
        });
    });
});
