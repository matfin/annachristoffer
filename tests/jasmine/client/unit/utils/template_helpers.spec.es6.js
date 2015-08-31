'use strict';

describe('UI Helpers', function() {

	describe('formattedDate', function() {
		it('should return the correctly formatted dates, or the passed in date if it is not valid', function(done) {
			/** 
			 *	Run the function and the tests
			 */
			expect(UI._globalHelpers.formattedDate('2015-07-01', 'YYYY')).toEqual('2015');
			expect(UI._globalHelpers.formattedDate('12345', 'YYYY')).toEqual('12345');
			/**
			 *	Finished
			 */
			done();
		});
	});

	describe('device', function(done) {
		it('should call depend on the resized dependency and return the Device object', function(done) {
			/**
			 *	Spies
			 */
			spyOn(Dependencies.resized, 'depend').and.returnValue({});

			/** 
			 *	Call the function
			 */
			expect(UI._globalHelpers.device()).toEqual(jasmine.any(Object));
			expect(Dependencies.resized.depend).toHaveBeenCalled();

			/**
			 *	Done
			 */
			done();
		});
	});

});