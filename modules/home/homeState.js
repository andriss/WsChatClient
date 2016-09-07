// to save state between page views/switches
app.factory('homeState', function() {

    return {
      userName: '',
      isLoading: false,
      isBtnEnabled: true,
      errorMsg: ''
    };

});
