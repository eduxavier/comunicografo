/// <reference path="algorithms/knn.js" />
/// <reference path="core.helper.js" />

var gabarito = {
    gabaritos: [],
    analse: function (messages) {
        this.popular();
        var area = document.getElementById("gabarito");
        var session_chat_id = helper.get_checked_radio("chat_session_type");

        helper.empty(area);

        var filtro = function (a) {
            return (a.chat_id == session_chat_id);
        }

        var gabaritos = this.gabaritos.filter(filtro);

        for (var g in gabaritos) {
            var root = document.createElement("ul");
            var gabarito = gabaritos[g];
            var total_acertos = 0;
            var total_erros = 0;


            for (var m = 0; m < gabarito.mensagens.length; m++) {
                for (var i = 0; i < messages.length; i++) {
                    if (gabarito.mensagens[m].id == messages[i].id) {
                        if (messages[i].parent === undefined) {
                            gabarito.mensagens[m].resultado = 0;
                            set_situacao((gabarito.mensagens[m].pai == 0),
                                          gabarito.mensagens[m]);
                        }
                        else {
                            gabarito.mensagens[m].resultado = messages[i].parent.id;
                            set_situacao((gabarito.mensagens[m].pai == messages[i].parent.id),
                                gabarito.mensagens[m]);
                        }
                    }
                }
            }

            function set_situacao(condicao, gabarito) {
                if (condicao) {
                    total_acertos++;
                    gabarito.situacao = "ok";
                }
                else {
                    total_erros++
                    gabarito.situacao = "erro";
                }
            }

            gabarito.acertos    = total_acertos;
            gabarito.erros      = total_erros;
            gabarito.precisao   = total_acertos / knn.assignments;
            gabarito.recall     = total_acertos / gabarito.mensagens.length;
            gabarito.f1         = (2 * (gabarito.precisao * gabarito.recall)) / (gabarito.precisao + gabarito.recall);

            var div_gabarito = document.createElement("div");
                div_gabarito.setAttribute("class", "gabarito_area");

            var cabecalho = document.createElement("h4");
                cabecalho.innerText = "Avaliador: " + gabarito.avaliador;

            div_gabarito.appendChild(cabecalho);

            var totalizadores = document.createElement("h2");

            var tabele_sumary = "<table  class='gabarito'><tr><td>acertos</td><td>erros</td><td>precisão</td><td>recall</td><td>F1</td></tr>";

            tabele_sumary += "<tr>";
            tabele_sumary += "<td>" + gabarito.acertos + "</td>";
            tabele_sumary += "<td>" + gabarito.erros + "</td>";
            tabele_sumary += "<td>" + gabarito.precisao.toFixed(2) + "</td>";
            tabele_sumary += "<td>" + gabarito.recall.toFixed(2) + "</td>";
            tabele_sumary += "<td>" + gabarito.f1.toFixed(2) + "</td>";
            tabele_sumary += "</tr></table>";
            
            totalizadores.innerHTML = tabele_sumary

            div_gabarito.appendChild(totalizadores);

            var detalhes = document.createElement("ul");

            var visualizacao = "<table class='gabarito'>";
            var colunas = 0;

            for (var m = 0; m < gabarito.mensagens.length; m++) {
                var detalhe = document.createElement("li");

                var table = "<strong>Vizinho Proximo da Mensagem " + gabarito.mensagens[m].id + "</strong><br />";


                table += "<table class='gabarito'><tr><td>Vizinho Por Humano</td><td>Vizinho Por Algoritimo</td><td>Situacao</td><tr>"
                table += "<tr class='" + gabarito.mensagens[m].situacao + "' >";
                table += "<td>";
                table += gabarito.mensagens[m].pai;
                table += "</td>";
                table += "<td>";
                table += gabarito.mensagens[m].resultado;
                table += "</td>";
                table += "<td>";
                table += gabarito.mensagens[m].situacao;
                table += "</td>";
                table += "</tr></table>";



                if (colunas % 10 == 0)
                    visualizacao += (colunas == 0) ? "<tr>" : "</tr><tr>";
                
                var bolinha = "X";
                if (gabarito.mensagens[m].situacao == "ok")
                    bolinha = "o";

                visualizacao += "<td class='" + gabarito.mensagens[m].situacao + "'>" + bolinha + "</td>"

                detalhe.innerHTML = table;
                detalhes.appendChild(detalhe);
                colunas++;
            }

            visualizacao += "</tr></table>";
            
            div_gabarito.innerHTML += visualizacao;
            div_gabarito.appendChild(detalhes);

            area.appendChild(div_gabarito);
        }
    },
    popular: function () {
        var chat_a_1 = {
            avaliador: 'Eduardo Xavier',
            chat_id: 1,
            acertos: 0,
            erros: 0,
            mensagens: [
                { 'id': 1, pai: 0, resultado: 0, situacao: '' },
                { 'id': 2, pai: 1, resultado: 0, situacao: '' },
                { 'id': 3, pai: 1, resultado: 0, situacao: '' },
                { 'id': 4, pai: 1, resultado: 0, situacao: '' },
                { 'id': 5, pai: 4, resultado: 0, situacao: '' },
                { 'id': 6, pai: 5, resultado: 0, situacao: '' },
                { 'id': 7, pai: 0, resultado: 0, situacao: '' },
                { 'id': 8, pai: 7, resultado: 0, situacao: '' },
                { 'id': 9, pai: 0, resultado: 0, situacao: '' },
                { 'id': 10, pai: 0, resultado: 0, situacao: '' },
                { 'id': 11, pai: 10, resultado: 0, situacao: '' },
                { 'id': 12, pai: 11, resultado: 0, situacao: '' },
                { 'id': 13, pai: 14, resultado: 0, situacao: '' },
                { 'id': 14, pai: 13, resultado: 0, situacao: '' },
                { 'id': 15, pai: 0, resultado: 0, situacao: '' },
                { 'id': 16, pai: 15, resultado: 0, situacao: '' },
                { 'id': 17, pai: 0, resultado: 0, situacao: '' }
            ]
        };

        var chat_a_2 = {
            avaliador: 'Eduardo Xavier',
            chat_id: 2,
            acertos: 0,
            erros: 0,
            mensagens: [
                { 'id': 1, pai: 0, resultado: 0, situacao: '' },
                { 'id': 2, pai: 1, resultado: 0, situacao: '' },
                { 'id': 3, pai: 1, resultado: 0, situacao: '' },
                { 'id': 4, pai: 1, resultado: 0, situacao: '' },
                { 'id': 5, pai: 4, resultado: 0, situacao: '' },
                { 'id': 6, pai: 5, resultado: 0, situacao: '' },
                { 'id': 7, pai: 1, resultado: 0, situacao: '' },
                { 'id': 8, pai: 5, resultado: 0, situacao: '' },
                { 'id': 9, pai: 1, resultado: 0, situacao: '' },
                { 'id': 10, pai: 9, resultado: 0, situacao: '' },
                { 'id': 11, pai: 10, resultado: 0, situacao: '' },
                { 'id': 12, pai: 8, resultado: 0, situacao: '' },
                { 'id': 13, pai: 11, resultado: 0, situacao: '' },
                { 'id': 14, pai: 7, resultado: 0, situacao: '' },
                { 'id': 15, pai: 13, resultado: 0, situacao: '' },
                { 'id': 16, pai: 1, resultado: 0, situacao: '' },
                { 'id': 17, pai: 16, resultado: 0, situacao: '' },
                { 'id': 18, pai: 17, resultado: 0, situacao: '' },
                { 'id': 19, pai: 14, resultado: 0, situacao: '' }
            ]
        };

        this.gabaritos.push(chat_a_1);
        this.gabaritos.push(chat_a_2);

        var chat_4 = {
            valiador: 'Próprio Usuário - Pesquisa Thiago', chat_id: 4, acertos: 0, erros: 0,
            mensagens: [
{ 'id': 1486, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1487, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1488, 'pai': '1487', 'resultado': '', 'situacao': '' },
{ 'id': 1489, 'pai': '1486', 'resultado': '', 'situacao': '' },
{ 'id': 1490, 'pai': '1488', 'resultado': '', 'situacao': '' },
{ 'id': 1491, 'pai': '1489', 'resultado': '', 'situacao': '' },
{ 'id': 1492, 'pai': '1491', 'resultado': '', 'situacao': '' },
{ 'id': 1493, 'pai': '1490', 'resultado': '', 'situacao': '' },
{ 'id': 1494, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1495, 'pai': '1493', 'resultado': '', 'situacao': '' },
{ 'id': 1496, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1497, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1498, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1499, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1500, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1501, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1502, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1503, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1504, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1505, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1506, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1507, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1508, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1509, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1510, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1511, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1512, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1513, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1514, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1515, 'pai': '1513', 'resultado': '', 'situacao': '' },
{ 'id': 1516, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1517, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1518, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1519, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1520, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1521, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1522, 'pai': '1517', 'resultado': '', 'situacao': '' },
{ 'id': 1523, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1524, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1525, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1526, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1527, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1528, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1529, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1530, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1531, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1532, 'pai': '1498', 'resultado': '', 'situacao': '' },
{ 'id': 1533, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1534, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1535, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1536, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1537, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1538, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1539, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1540, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1541, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1542, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1543, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1544, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1545, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1546, 'pai': '1534', 'resultado': '', 'situacao': '' },
{ 'id': 1547, 'pai': '1541', 'resultado': '', 'situacao': '' },
{ 'id': 1548, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1549, 'pai': '1547', 'resultado': '', 'situacao': '' },
{ 'id': 1550, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1551, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1552, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1553, 'pai': '1549', 'resultado': '', 'situacao': '' },
{ 'id': 1554, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1555, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1556, 'pai': '1549', 'resultado': '', 'situacao': '' },
{ 'id': 1557, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1558, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1559, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1560, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1561, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1562, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1563, 'pai': '1560', 'resultado': '', 'situacao': '' },
{ 'id': 1564, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1565, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1566, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1567, 'pai': '1553', 'resultado': '', 'situacao': '' },
{ 'id': 1568, 'pai': '1563', 'resultado': '', 'situacao': '' },
{ 'id': 1569, 'pai': '1567', 'resultado': '', 'situacao': '' },
{ 'id': 1570, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1571, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1572, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1573, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1574, 'pai': '1563', 'resultado': '', 'situacao': '' },
{ 'id': 1575, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1576, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1577, 'pai': '1574', 'resultado': '', 'situacao': '' },
{ 'id': 1578, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1579, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1580, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1581, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1582, 'pai': '1580', 'resultado': '', 'situacao': '' },
{ 'id': 1583, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1584, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1585, 'pai': '1574', 'resultado': '', 'situacao': '' },
{ 'id': 1586, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1587, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1588, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1589, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1590, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1591, 'pai': '1588', 'resultado': '', 'situacao': '' },
{ 'id': 1592, 'pai': '1591', 'resultado': '', 'situacao': '' },
{ 'id': 1593, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1594, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1595, 'pai': '1588', 'resultado': '', 'situacao': '' },
{ 'id': 1596, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1597, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1598, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1599, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1600, 'pai': '1597', 'resultado': '', 'situacao': '' },
{ 'id': 1601, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1602, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1603, 'pai': '1597', 'resultado': '', 'situacao': '' },
{ 'id': 1604, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1605, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1606, 'pai': '1604', 'resultado': '', 'situacao': '' },
{ 'id': 1607, 'pai': '1604', 'resultado': '', 'situacao': '' },
{ 'id': 1608, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1609, 'pai': '1606', 'resultado': '', 'situacao': '' },
{ 'id': 1610, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1611, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1612, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1613, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1614, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1615, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1616, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1617, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1618, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1619, 'pai': '1614', 'resultado': '', 'situacao': '' },
{ 'id': 1620, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1621, 'pai': '1619', 'resultado': '', 'situacao': '' },
{ 'id': 1622, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1623, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1624, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1625, 'pai': '1621', 'resultado': '', 'situacao': '' },
{ 'id': 1626, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1627, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1628, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1629, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1630, 'pai': '1627', 'resultado': '', 'situacao': '' },
{ 'id': 1631, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1632, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1633, 'pai': '1627', 'resultado': '', 'situacao': '' },
{ 'id': 1634, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1635, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1636, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1637, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1638, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1639, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1640, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1641, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1642, 'pai': '1633', 'resultado': '', 'situacao': '' },
{ 'id': 1643, 'pai': '1641', 'resultado': '', 'situacao': '' },
{ 'id': 1644, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1645, 'pai': '1638', 'resultado': '', 'situacao': '' },
{ 'id': 1646, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1647, 'pai': '1645', 'resultado': '', 'situacao': '' },
{ 'id': 1648, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1649, 'pai': '1647', 'resultado': '', 'situacao': '' },
{ 'id': 1650, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1651, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1652, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1653, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1654, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1655, 'pai': '1652', 'resultado': '', 'situacao': '' },
{ 'id': 1656, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1657, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1658, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1659, 'pai': '1658', 'resultado': '', 'situacao': '' },
{ 'id': 1660, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1661, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1662, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1663, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1664, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1665, 'pai': '1660', 'resultado': '', 'situacao': '' },
{ 'id': 1666, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1667, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1668, 'pai': '1660', 'resultado': '', 'situacao': '' },
{ 'id': 1669, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1670, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1671, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1672, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1673, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1674, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1675, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1676, 'pai': '1674', 'resultado': '', 'situacao': '' },
{ 'id': 1677, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1678, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1679, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1680, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1681, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1682, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1683, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1684, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1685, 'pai': '1675', 'resultado': '', 'situacao': '' },
{ 'id': 1686, 'pai': '1684', 'resultado': '', 'situacao': '' },
{ 'id': 1687, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1688, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1689, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1690, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1691, 'pai': '1681', 'resultado': '', 'situacao': '' },
{ 'id': 1692, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1693, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1694, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1695, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1696, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1697, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1698, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1699, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1700, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1701, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1702, 'pai': '1700', 'resultado': '', 'situacao': '' },
{ 'id': 1703, 'pai': '1701', 'resultado': '', 'situacao': '' },
{ 'id': 1704, 'pai': '1701', 'resultado': '', 'situacao': '' },
{ 'id': 1705, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1706, 'pai': '1701', 'resultado': '', 'situacao': '' },
{ 'id': 1707, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1708, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1709, 'pai': '1703', 'resultado': '', 'situacao': '' },
{ 'id': 1710, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1711, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1712, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1713, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1714, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1715, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1716, 'pai': '1711', 'resultado': '', 'situacao': '' },
{ 'id': 1717, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1718, 'pai': '1717', 'resultado': '', 'situacao': '' },
{ 'id': 1719, 'pai': '1718', 'resultado': '', 'situacao': '' },
{ 'id': 1720, 'pai': '1717', 'resultado': '', 'situacao': '' },
{ 'id': 1721, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1722, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1723, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1724, 'pai': '1720', 'resultado': '', 'situacao': '' },
{ 'id': 1725, 'pai': '1721', 'resultado': '', 'situacao': '' },
{ 'id': 1726, 'pai': '1724', 'resultado': '', 'situacao': '' },
{ 'id': 1727, 'pai': '1725', 'resultado': '', 'situacao': '' },
{ 'id': 1728, 'pai': '1721', 'resultado': '', 'situacao': '' },
{ 'id': 1729, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1730, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1731, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1732, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1733, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1734, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1735, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1736, 'pai': '1730', 'resultado': '', 'situacao': '' },
{ 'id': 1737, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1738, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1739, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1740, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1741, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1742, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1743, 'pai': '1737', 'resultado': '', 'situacao': '' },
{ 'id': 1744, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1745, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1746, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1747, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1748, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1749, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1750, 'pai': '1746', 'resultado': '', 'situacao': '' },
{ 'id': 1751, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1752, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1753, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1754, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1755, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1756, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1757, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1758, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1759, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1760, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1761, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1762, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1763, 'pai': '1760', 'resultado': '', 'situacao': '' },
{ 'id': 1764, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1765, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1766, 'pai': '1765', 'resultado': '', 'situacao': '' },
{ 'id': 1767, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1768, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1769, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1770, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1771, 'pai': '0', 'resultado': '', 'situacao': '' },
{ 'id': 1772, 'pai': '0', 'resultado': '', 'situacao': '' }

            ]
        };

        this.gabaritos.push(chat_4);
    }
}