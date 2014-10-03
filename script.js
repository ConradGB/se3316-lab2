var hold;
var nHold;

window.onload = function ()
{

    changeContinent("All");
    
}

function findProvinces(countryTag, provincePath, provinceNPath) {
    var names = '';
    var first = true;
    var holds;

    while (hold != null && hold.getAttribute('country') == countryTag) {
        if (first) {
            first = false;
        }
        else {
            names += ", "

        }
        names += nHold.childNodes[0].nodeValue;


        hold = provincePath.iterateNext();
        nHold = provinceNPath.iterateNext();
    }
    if (names == '') {
        names = "N/A";
    }
    hold = provincePath.iterateNext();
    nHold = provinceNPath.iterateNext();
    return names;
}

function loadXMLDoc(filename) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}

function populateDropDown (dropdown, continentResults, selected)
{
    
    var option = "All";
    var tba = document.createElement("option");
    tba.textContent = option;
    tba.value = option;
    dropdown.appendChild(tba);
    if (selected == 'All') {
        selected = tba.value;
    }
    var run = true;
    while (run)
    {
        try
        {
            var option = continentResults.iterateNext().childNodes[0].nodeValue;
        }
        catch (err)
        {
            run = false;
            break;
        }
        var tba = document.createElement("option");
        tba.textContent = option;
        tba.value = option;
        dropdown.appendChild(tba);
    }
    
        dropdown.selectedIndex = selected;
    
}

function changeContinent(continent)
{


    xml = loadXMLDoc("mondial.xml");

    var table = document.getElementById("countries");
    var dropDown = document.getElementById("dropList");

    table.innerHTML = "";
    var index = dropDown.selectedIndex;
    dropDown.innerHTML = "";
    headers(table);


    path = "/mondial/continent/name";
    var continentHld = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
    populateDropDown(dropDown, continentHld, index);

    path = "/mondial/country";
    var countryHld = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);

    path = "/mondial/country/name";
    var nameHld = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);

    path = "/mondial/country/province";
    var provinceHld = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);

    path = "/mondial/country/province/name";
    var provinceNHld = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);

    path = "//city[@is_country_cap='yes']/name";
    var ccHld = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);

    path = "/mondial/country/population"
    var popHld = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);

    path = "/mondial/country/encompassed"
    var tester = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);

    hold = provinceHld.iterateNext();
    nHold = provinceNHld.iterateNext();
    var run = true;

    do {
        var country;
        var row = document.createElement("tr");
        var name = document.createElement("td");
        var provinces = document.createElement("td");
        var capitol = document.createElement("td");
        var pop = document.createElement("td");

        try 
        {
            var country = countryHld.iterateNext();
            var tag = country.getAttribute("car_code");
        }
        catch (err) {
            run = false;
            break;
        }
        
        





        name.appendChild(document.createTextNode(nameHld.iterateNext().childNodes[0].nodeValue));
        provinces.appendChild(document.createTextNode(findProvinces(tag, provinceHld, provinceNHld)));
        capitol.appendChild(document.createTextNode(ccHld.iterateNext().childNodes[0].nodeValue));
        pop.appendChild(document.createTextNode(popHld.iterateNext().childNodes[0].nodeValue));

        
        var tester2 = tester.iterateNext();
        var tester3 = tester2.getAttribute('continent');
        var count = parseFloat(tester2.getAttribute('percentage'));

        while (count < 100)
        {
            var save = false;
            var holding;
            if (tester3.toLowerCase() == continent.toLowerCase())
            {
                save = true;
                holding = tester3;
            }
            if (save)
            {
                tester3 = holding;
            }
            tester2 = tester.iterateNext();
            tester3 = tester2.getAttribute('continent');
            count += parseFloat(tester2.getAttribute('percentage'));
        }

        if (continent.toLowerCase() == "australia/oceania")
        {
            continent = "australia";
        }



        if ( tester3.toLowerCase() != continent.toLowerCase() && continent != "All")
        {
            continue;
        }

        row.appendChild(name);
        row.appendChild(provinces);
        row.appendChild(capitol);
        row.appendChild(pop);



        table.appendChild(row);
    } while (run)
    
}

function headers(table)
{
    row = document.createElement("tr");
    header = document.createElement("th");
    header.appendChild(document.createTextNode("Country"));
    row.appendChild(header);
    header = document.createElement("th");
    header.appendChild(document.createTextNode("Provinces"));
    row.appendChild(header);
    header = document.createElement("th");
    header.appendChild(document.createTextNode("Capital City"));
    row.appendChild(header);
    header = document.createElement("th");
    header.appendChild(document.createTextNode("Population"));
    row.appendChild(header);
    table.appendChild(row);
}