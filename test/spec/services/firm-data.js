'use strict';

describe('Service: firmData', function () {

  // load the service's module
  beforeEach(module('femaDemoApp'));

  // instantiate service
  var firmData;
  beforeEach(inject(function (_firmData_) {
    firmData = _firmData_;
  }));

  it('should do something', function () {
    expect(!!firmData).toBe(true);
  });

});
