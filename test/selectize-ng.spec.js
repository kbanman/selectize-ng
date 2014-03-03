describe('Tests for selectize-ng', function() {
  'use strict';

  function compile(template) {
    return $compile(template)($scope);
  }

  var $scope, $compile;

  beforeEach(module('selectize-ng'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
  }));

  var markup = {
    selectMinimal: '<select selectize ng-model="selected"></select>',
    selectWithOptions: '<select selectize ng-model="selected">' +
      '<option value="0">Zero</option>' +
      '<option value="1">One</option>' +
      '</select>',
    selectWithNull: '<select selectize ng-model="selected">' +
      '<option value="">Null</option>' +
      '<option value="0">Zero</option>' +
      '<option value="1">One</option>' +
      '</select>',
    selectWithEmptyOption: '<select selectize="config" ng-model="selected">' +
      '<option value=""></option>' +
      '<option value="0">Zero</option>' +
      '<option value="1">One</option>' +
      '</select>',
    inputMinimal: '<input selectize ng-model="selected"/>',
    inputWithOptions: '<input selectize="config" ng-model="selected" options="options"/>'
  };

  var data = {
    names: [
      { value: 1, text: 'Bob' },
      { value: 2, text: 'Sally' },
      { value: 3, text: 'Jill' },
      { value: 4, text: 'Jane' }
    ],
    namesWithCustomProperties: [
      { id: 1, name: 'Bob' },
      { id: 2, name: 'Sally' },
      { id: 3, name: 'Jill' },
      { id: 4, name: 'Jane' }
    ]
  };

  describe('with select', function() {

    it('should compile without an error', function() {
      expect(function() {
        compile(markup.selectMinimal);
      }).not.toThrow();
    });

    it('should build the DOM structure as expected', function() {
      var element = compile(markup.selectMinimal);

      expect(element.next().hasClass('selectize-control')).toBe(true);
      expect(element.next().children().eq(0).hasClass('selectize-input')).toBe(true);
      expect(element.next().children().eq(1).hasClass('selectize-dropdown')).toBe(true);
    });

    it('should compile properly', function() {
      var ready = false;
      var element = compile(markup.selectWithNull);
      element[0].selectize.focus();

      runs(function() {
        setTimeout(function() {
          ready = true;
          var $content = element.next().find('.selectize-dropdown').find('.selectize-dropdown-content');
          expect($content.children().length).toBe(2);
        }, 10);
      });

      waitsFor(function() {
        return ready;
      });
    });

    it('should update the model', function() {
      var element = compile(markup.selectWithNull);

      $scope.$apply();

      element[0].selectize.setValue('0');
      expect($scope.selected).toBe('0');
    });

    it('should update when model changes', function() {
      var ready = false;
      $scope.selected = '';
      var element = compile(markup.selectWithNull);

      $scope.$apply(function() {
        $scope.selected = '1';
      });

      runs(function() {
        setTimeout(function() {
          ready = true;
          expect(element[0].selectize.getValue()).toBe('1');
        }, 10);
      });

      waitsFor(function() {
        return ready;
      });
    });

    it('should work with a initialized filled model', function() {
      var ready = false;
      $scope.selected = '1';
      var element = compile(markup.selectWithOptions);

      $scope.$apply();

      runs(function() {
        setTimeout(function() {
          ready = true;
          expect(element[0].selectize.getValue()).toBe('1');
        }, 10);
      });

      waitsFor(function() {
        return ready;
      });
    });

    it('should display the placeholder when no options are defined', function() {
      var ready = false;

      $scope.config = {
        placeholder: 'Enter a value of some sort'
      };

      var element = compile(markup.selectWithEmptyOption);

      runs(function() {
        setTimeout(function() {
          ready = true;
          var $content = element.next().find('.selectize-input');
          expect($content.children('input').attr('placeholder')).toBe($scope.config.placeholder);
        }, 10);
      });

      waitsFor(function() {
        return ready;
      });
    });
  });

  describe('with input', function() {

    it('should compile without an error', function() {
      expect(function() {
        compile(markup.inputMinimal);
      }).not.toThrow();
    });

    it('should build the DOM structure as expected', function() {
      var element = compile(markup.inputMinimal);

      expect(element.next().hasClass('selectize-control')).toBe(true);
      expect(element.next().children().eq(0).hasClass('selectize-input')).toBe(true);
      expect(element.next().children().eq(1).hasClass('selectize-dropdown')).toBe(true);
    });

    it('should update the model', function() {
      var ready = false;
      $scope.options = data.names;
      var element = compile(markup.inputWithOptions);

      $scope.$apply();

      setTimeout(function() {
        element[0].selectize.setValue('1');
      });

      runs(function() {
        setTimeout(function() {
          ready = true;
          expect($scope.selected).toBe('1');
        }, 100);
      });

      waitsFor(function() {
        return ready;
      });
    });

    it('should update when model changes', function() {
      var ready = false;
      $scope.selected = '';
      $scope.options = data.names;
      var element = compile(markup.inputWithOptions);

      $scope.$apply(function() {
        $scope.selected = '1';
      });

      runs(function() {
        setTimeout(function() {
          ready = true;
          expect(element[0].selectize.getValue()).toBe('1');
        }, 10);
      });

      waitsFor(function() {
        return ready;
      });
    });

    it('should work with a initialized filled model', function() {
      var ready = false;
      $scope.selected = '1';
      $scope.options = data.names;
      var element = compile(markup.inputWithOptions);

      $scope.$apply();

      runs(function() {
        setTimeout(function() {
          ready = true;
          expect(element[0].selectize.getValue()).toBe('1');
        }, 10);
      });

      waitsFor(function() {
        return ready;
      });
    });

    it('should display the placeholder when no value is provided', function() {
      var ready = false;
      $scope.options = data.names;
      $scope.config = {
        placeholder: 'Enter a value of some sort'
      };

      var element = compile(markup.inputWithOptions);

      $scope.$apply();

      runs(function() {
        setTimeout(function() {
          ready = true;
          var $content = element.next().find('.selectize-input');
          expect($content.children('input').attr('placeholder')).toBe($scope.config.placeholder);
        }, 10);
      });

      waitsFor(function() {
        return ready;
      });
    });

    it('should respect custom property names', function() {
      var ready = false;
      $scope.selected = '1';
      $scope.options = data.namesWithCustomProperties;
      $scope.config = {
        valueField: 'id',
        labelField: 'name'
      };

      var element = compile(markup.inputWithOptions);

      $scope.$apply();

      runs(function() {
        setTimeout(function() {
          ready = true;
          var $content = element.next().find('.selectize-input');
          expect($content.children('.item').text()).toBe('Bob');
        }, 10);
      });

      waitsFor(function() {
        return ready;
      });
    });

    it('should work with multiple values', function() {
      var ready = false;
      $scope.selected = [1, 2];
      $scope.options = data.names;

      var element = compile(markup.inputWithOptions);

      $scope.$apply();

      runs(function() {
        setTimeout(function() {
          ready = true;
          var $items = element.next().find('.selectize-input').children('.item');
          expect($items.length).toBe(2);
          expect($items.eq(0).text()).toBe('Bob');
          expect($items.eq(1).text()).toBe('Sally');
        }, 10);
      });

      waitsFor(function() {
        return ready;
      });
    });

    it('should allow for late-loading options', function() {
      var ready = false;
      $scope.selected = [1,5];
      $scope.options = angular.copy(data.names);

      var element = compile(markup.inputWithOptions);

      $scope.$apply();

      runs(function() {
        setTimeout(function() {
          var $items = element.next().find('.selectize-input').children('.item');
          expect($items.length).toBe(1);
          expect($items.eq(0).text()).toBe('Bob');

          $scope.options.push({ value: 5, text: 'Luke' });
          $scope.$digest();

          setTimeout(function() {
            ready = true;
            var $items = element.next().find('.selectize-input').children('.item');
            expect($items.length).toBe(2);
            expect($items.eq(0).text()).toBe('Bob');
            expect($items.eq(1).text()).toBe('Luke');
          }, 10);
        }, 10);
      });

      waitsFor(function() {
        return ready;
      });
    });

  });
});