var hold;
var nHold;

window.onload = function () {
    xml = loadXMLDoc("mondial.xml");

    var table = document.getElementById("countries");


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
    
    hold = provinceHld.iterateNext();
    nHold = provinceNHld.iterateNext();
    
    do
    {
        var run = true;

        var row = document.createElement("tr");
        var name = document.createElement("td");
        var provinces = document.createElement("td");
        var capitol = document.createElement("td");
        var pop = document.createElement("td");

        try
        {
            var tag = countryHld.iterateNext().getAttribute("car_code");
        }
        catch (err)
        {
            run = false;
            break;
        }

        name.appendChild(document.createTextNode(nameHld.iterateNext().childNodes[0].nodeValue));
        provinces.appendChild(document.createTextNode(findProvinces(tag,provinceHld, provinceNHld)));
        capitol.appendChild(document.createTextNode(ccHld.iterateNext().childNodes[0].nodeValue));
        

        pop.appendChild(document.createTextNode(popHld.iterateNext().childNodes[0].nodeValue));


        row.appendChild(name);
        row.appendChild(provinces);
        row.appendChild(capitol);
        row.appendChild(pop);



        table.appendChild(row);
    } while(run)
    //table.innerHTML = "";

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
