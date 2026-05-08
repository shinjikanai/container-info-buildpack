'use strict';

angular.module('containerInfoWebUiApp', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/buildpack', {
                templateUrl: 'views/buildpack.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

'use strict';

angular.module('containerInfoWebUiApp')
    .controller('MainCtrl', function ($scope, $http) {

        var graphPositions = {
            center: { left: '40%', top: '38%' },
            top: { left: '39%', top: '8%' },
            right: { left: '69%', top: '35%' },
            bottom: { left: '39%', top: '68%' },
            left: { left: '10%', top: '35%' }
        };

        var graphLines = [
            { style: { width: '26%', left: '47%', top: '45%', transform: 'rotate(-2deg)' } },
            { style: { width: '25%', left: '47%', top: '45%', transform: 'rotate(88deg)' } },
            { style: { width: '25%', left: '25%', top: '45%', transform: 'rotate(178deg)' } },
            { style: { width: '25%', left: '47%', top: '23%', transform: 'rotate(-88deg)' } }
        ];

        var leftGraphLine = [graphLines[2]];

        var q01RelationshipLinks = [
            {
                from: 'Q01',
                to: 'A4',
                type: '前提確認リンク',
                title: '今扱う理由と古い前提の見直し',
                description: '「なぜ今このテーマを扱うのか？」という問いは、古い前提に引っ張られて判断が遅れていないかを確認する観点につながっています。',
                style: { left: '23%', top: '42%' }
            }
        ];

        function node(type, position, id, title, description) {
            return {
                type: type,
                style: graphPositions[position],
                id: id,
                title: title,
                description: description
            };
        }

        function graph(questionId, questionTitle, centerDescription, topTitle, topDescription, rightTitle, rightDescription, bottomTitle, bottomDescription, leftTitle, leftDescription) {
            return [
                node('core', 'center', questionId, questionTitle, centerDescription),
                node('signal', 'top', 'VIEWPOINT', topTitle, topDescription),
                node('evidence', 'right', 'EVIDENCE', rightTitle, rightDescription),
                node('choice', 'bottom', 'DECISION', bottomTitle, bottomDescription),
                node('risk', 'left', 'WATCHOUT', leftTitle, leftDescription)
            ];
        }

        $scope.questions = [
            {
                id: 1,
                label: '問い1',
                title: 'なぜ今このテーマを扱うのか？',
                summary: '背景、変化、意思決定の必要性を整理する。',
                graphLead: '問い1では、背景の変化から優先順位を決めるまでの思考回路を表示しています。',
                nodes: [
                    node('core', 'center', 'Q01', 'なぜ今このテーマを扱うのか？', 'テーマを扱うタイミングを定義する。'),
                    node('risk', 'left', 'A4', '古い前提の見直し', '古い前提に引っ張られていないか確認する。')
                ],
                lines: leftGraphLine,
                relationships: q01RelationshipLinks,
                conclusion: {
                    title: '今扱う理由は、変化が意思決定の遅れを許さない段階に入ったからです。',
                    body: '背景の変化、未対応時の影響、優先順位を並べると、この問いは単なる確認ではなく、次の行動を決める入口になります。',
                    points: [
                        '環境変化を起点にすると、課題の緊急度が見える。',
                        '未対応リスクを明示することで、着手の理由が共有しやすい。',
                        '結論はグラフのノードではなく、思考の到達点として下に表示する。'
                    ]
                }
            },
            {
                id: 2,
                label: '問い2',
                title: '誰にとって重要な問いなのか？',
                summary: '関係者、受け手、期待値をつなげて考える。',
                graphLead: '問い2では、対象者の期待と判断基準を結びつけて重要度を見える化します。',
                nodes: graph(
                    'Q02', '誰にとって重要な問いなのか？', '問いの受け手を明確にする。',
                    '主要ユーザー', '最も影響を受ける人を特定する。',
                    '期待値', 'その人が何を求めているかを見る。',
                    '価値の届け方', 'どの体験で価値を伝えるか決める。',
                    '見落とし層', '声が小さい関係者を取り残さない。'
                ),
                lines: graphLines,
                conclusion: {
                    title: '重要性は、最も影響を受ける人の期待値と判断基準から決まります。',
                    body: '問い2の結論は、全員に同じ強さで伝えるのではなく、主要な受け手を定め、その人にとっての価値が見える構成にすることです。',
                    points: [
                        '主要ユーザーを先に定義すると、議論の焦点がぶれにくい。',
                        '期待値をグラフ化することで、価値の届け方を選びやすくなる。',
                        '見落とし層を確認し、結論の偏りを抑える。'
                    ]
                }
            },
            {
                id: 3,
                label: '問い3',
                title: 'どの根拠から結論へ進むのか？',
                summary: '事実、解釈、判断の順番を明確にする。',
                graphLead: '問い3では、根拠から解釈、判断へ進む経路をグラフで確認します。',
                nodes: graph(
                    'Q03', 'どの根拠から結論へ進むのか？', '結論までの道筋を整理する。',
                    '観測された事実', 'まず確認できる事実を置く。',
                    '解釈の幅', '複数の読み方を比較する。',
                    '採用する判断', '最も説明力の高い判断を選ぶ。',
                    '飛躍の確認', '根拠と結論の間に飛躍がないか見る。'
                ),
                lines: graphLines,
                conclusion: {
                    title: '結論の説得力は、事実と解釈と判断を分けて示すことで高まります。',
                    body: '問い3では、根拠をツリー上に置き、結論はその下に分離することで、どこまでが思考過程でどこからが到達点なのかを直感的に理解できます。',
                    points: [
                        '事実と解釈を混ぜないことで、納得感が上がる。',
                        '判断に至る枝を可視化すると、思考回路が追いやすい。',
                        '結論をグラフ外に置くことで、ツリー構造との整合性を保てる。'
                    ]
                }
            },
            {
                id: 4,
                label: '問い4',
                title: 'どの選択肢を比較すべきか？',
                summary: '代替案、評価軸、トレードオフを整理する。',
                graphLead: '問い4では、選択肢を比較するときの評価軸を可視化します。',
                nodes: graph('Q04', 'どの選択肢を比較すべきか？', '比較対象を揃える。', '代替案', '候補を洗い出す。', '評価軸', '同じものさしで見る。', '推奨案', '最も合う案を選ぶ。', 'トレードオフ', '失うものも確認する。'),
                lines: graphLines
            },
            {
                id: 5,
                label: '問い5',
                title: '次に取るべき行動は何か？',
                summary: '結論を実行計画へ変換する。',
                graphLead: '問い5では、結論を行動へ落とし込む流れを表示します。',
                nodes: graph('Q05', '次に取るべき行動は何か？', '実行の一歩目を決める。', '必要作業', 'やることを分解する。', '担当と期限', '動かす条件を決める。', '最初の一手', 'すぐ始める行動を選ぶ。', '実行リスク', '止まりそうな点を先に見る。'),
                lines: graphLines
            },
            {
                id: 6,
                label: '問い6',
                title: 'どう検証して改善するのか？',
                summary: '指標、振り返り、学習サイクルを設計する。',
                graphLead: '問い6では、実行後に学びを回収する検証サイクルを示します。',
                nodes: graph('Q06', 'どう検証して改善するのか？', '学びを次につなげる。', '成功指標', '何を測るか決める。', '観測データ', '結果を集める。', '改善判断', '続けるか変えるか決める。', '測定の偏り', '数字だけで誤読しない。'),
                lines: graphLines
            }
        ];

        $scope.activeQuestion = $scope.questions[0];

        $scope.selectQuestion = function (question) {
            $scope.activeQuestion = question;
        };

        $scope.cmd_results = '... remote command results go here ...';

        $scope.execute_command = function (cmd, url) {
            if (typeof url === 'undefined') {
                url = '/exec?cmd=' + cmd;
            } else {
                url += cmd;
            }

            $http({ method: 'GET', url: url })
                .success(function (data) {
                    $scope.cmd = cmd;
                    $scope.cmd_results = data;
                })
                .error(function (data, status) {
                    $scope.cmd = cmd;
                    $scope.cmd_results = 'Error: status:' + status + ', data:' + data;
                });

        };
    });
