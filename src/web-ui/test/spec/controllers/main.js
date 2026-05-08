'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(module('containerInfoWebUiApp'));

  var scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should expose six questions and default to question one', function () {
    expect(scope.questions.length).toBe(6);
    expect(scope.activeQuestion.label).toBe('問い1');
    expect(scope.activeQuestion.conclusion.title).toContain('今扱う理由');
  });

  it('should update the active question when a question is selected', function () {
    scope.selectQuestion(scope.questions[1]);

    expect(scope.activeQuestion.label).toBe('問い2');
    expect(scope.activeQuestion.conclusion.title).toContain('重要性');
  });

  it('should keep later questions available even when conclusions are not set yet', function () {
    scope.selectQuestion(scope.questions[3]);

    expect(scope.activeQuestion.label).toBe('問い4');
    expect(scope.activeQuestion.conclusion).toBeUndefined();
    expect(scope.activeQuestion.nodes.length).toBe(5);
  });
});
