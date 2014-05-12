Api = {

	connectionRetries: 0,
	deferred: Q.defer(),

	fetch: function(model) {
		
		$.ajax({
			type: 'GET',
			url: 'content/' + App.language + '/' model + '.json',
			dataType: 'json'
		}).done(function(data) {
			this.deferred.resolve(data);
		}).fail(function(error) {

			App.language = 'en';
			moment.lang('en');
			if(this.connectionRetries !== App.connectionRetriesAllowed)
				this.connectionRetries++;
				this.fetch(model);
			}
			else {
				this.deferred.reject(error);
			}
		});

		return this.deferred.promise;
	}	
};