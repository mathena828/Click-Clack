import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { Link } from "react-router-dom";
import {Form, Button, Alert, Container} from 'react-bootstrap'

const server = "http://localhost:5000";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [school, setSchool] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [, setCookie] = useCookies(['user']);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        server + "/api/users/register",
        {
          username,
          email,
          password,
          bio,
          school,
          country
        },
        config
      );
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setCookie('user', data.user, { path: '/' });
      window.location.reload();
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <Container fluid className="p-5">
       <h1>Get Started
        <span>
            <img  
            width={50}
            height={50}
            className="ml-2 mb-2"
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/rocket_1f680.png" 
            alt="hello"/>
        </span> </h1>
      <h5 className="mb-4">Create an account to join the <b className="underline-black">dialogue</b> and shape the future one message at a time.</h5>
      {error && <Alert variant="danger">
          {error}
      </Alert> }
      <Form onSubmit={registerHandler}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}
            value={username}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control as="textarea" placeholder="Enter bio" onChange={(e) => setBio(e.target.value)}
            value={bio}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>School</Form.Label>
          <Form.Control type="text" placeholder="Enter school" onChange={(e) => setSchool(e.target.value)}
            value={school}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Country</Form.Label>
            <Form.Control as="select" onChange={(e) => setCountry(e.target.value)}
              value={country}>
                <option value="AF">Afghanistan 🇦🇫</option>
                <option value="AO">Angola 🇦🇴</option>
                <option value="AL">Albania 🇦🇱</option>
                <option value="AD">Andorra 🇦🇩</option>
                <option value="AE">United Arab Emirates 🇦🇪</option>
                <option value="AR">Argentina 🇦🇷</option>
                <option value="AM">Armenia 🇦🇲</option>
                <option value="AG">Antigua and Barbuda 🇦🇬</option>
                <option value="AU">Australia 🇦🇺</option>
                <option value="AT">Austria 🇦🇹</option>
                <option value="AZ">Azerbaijan 🇦🇿</option>
                <option value="BI">Burundi 🇧🇮</option>
                <option value="BE">Belgium 🇧🇪</option>
                <option value="BJ">Benin 🇧🇯</option>
                <option value="BF">Burkina Faso 🇧🇫</option>
                <option value="BD">Bangladesh 🇧🇩</option>
                <option value="BG">Bulgaria 🇧🇬</option>
                <option value="BH">Bahrain 🇧🇭</option>
                <option value="BS">Bahamas 🇧🇸</option>
                <option value="BA">Bosnia and Herzegovina 🇧🇦</option>
                <option value="BY">Belarus 🇧🇾</option>
                <option value="BZ">Belize 🇧🇿</option>
                <option value="BO">Bolivia 🇧🇴</option>
                <option value="BR">Brazil 🇧🇷</option>
                <option value="BB">Barbados 🇧🇧</option>
                <option value="BN">Brunei 🇧🇳</option>
                <option value="BT">Bhutan 🇧🇹</option>
                <option value="BW">Botswana 🇧🇼</option>
                <option value="CF">Central African Republic 🇨🇫</option>
                <option value="CA">Canada 🇨🇦</option>
                <option value="CH">Switzerland 🇨🇭</option>
                <option value="CL">Chile 🇨🇱</option>
                <option value="CN">China 🇨🇳</option>
                <option value="CI">Ivory Coast 🇨🇮</option>
                <option value="CM">Cameroon 🇨🇲</option>
                <option value="CD">DR Congo 🇨🇩</option>
                <option value="CG">Republic of the Congo 🇨🇬</option>
                <option value="CO">Colombia 🇨🇴</option>
                <option value="KM">Comoros 🇰🇲</option>
                <option value="CV">Cape Verde 🇨🇻</option>
                <option value="CR">Costa Rica 🇨🇷</option>
                <option value="CU">Cuba 🇨🇺</option>
                <option value="CY">Cyprus 🇨🇾</option>
                <option value="CZ">Czechia 🇨🇿</option>
                <option value="DE">Germany 🇩🇪</option>
                <option value="DJ">Djibouti 🇩🇯</option>
                <option value="DM">Dominica 🇩🇲</option>
                <option value="DK">Denmark 🇩🇰</option>
                <option value="DO">Dominican Republic 🇩🇴</option>
                <option value="DZ">Algeria 🇩🇿</option>
                <option value="EC">Ecuador 🇪🇨</option>
                <option value="EG">Egypt 🇪🇬</option>
                <option value="ER">Eritrea 🇪🇷</option>
                <option value="ES">Spain 🇪🇸</option>
                <option value="EE">Estonia 🇪🇪</option>
                <option value="ET">Ethiopia 🇪🇹</option>
                <option value="FI">Finland 🇫🇮</option>
                <option value="FJ">Fiji 🇫🇯</option>
                <option value="FR">France 🇫🇷</option>
                <option value="FM">Micronesia 🇫🇲</option>
                <option value="GA">Gabon 🇬🇦</option>
                <option value="GB">United Kingdom 🇬🇧</option>
                <option value="GE">Georgia 🇬🇪</option>
                <option value="GH">Ghana 🇬🇭</option>
                <option value="GN">Guinea 🇬🇳</option>
                <option value="GM">Gambia 🇬🇲</option>
                <option value="GW">Guinea-Bissau 🇬🇼</option>
                <option value="GQ">Equatorial Guinea 🇬🇶</option>
                <option value="GR">Greece 🇬🇷</option>
                <option value="GD">Grenada 🇬🇩</option>
                <option value="GT">Guatemala 🇬🇹</option>
                <option value="GY">Guyana 🇬🇾</option>
                <option value="HN">Honduras 🇭🇳</option>
                <option value="HR">Croatia 🇭🇷</option>
                <option value="HT">Haiti 🇭🇹</option>
                <option value="HU">Hungary 🇭🇺</option>
                <option value="ID">Indonesia 🇮🇩</option>
                <option value="IN">India 🇮🇳</option>
                <option value="IE">Ireland 🇮🇪</option>
                <option value="IR">Iran 🇮🇷</option>
                <option value="IQ">Iraq 🇮🇶</option>
                <option value="IS">Iceland 🇮🇸</option>
                <option value="IL">Israel 🇮🇱</option>
                <option value="IT">Italy 🇮🇹</option>
                <option value="JM">Jamaica 🇯🇲</option>
                <option value="JO">Jordan 🇯🇴</option>
                <option value="JP">Japan 🇯🇵</option>
                <option value="KZ">Kazakhstan 🇰🇿</option>
                <option value="KE">Kenya 🇰🇪</option>
                <option value="KG">Kyrgyzstan 🇰🇬</option>
                <option value="KH">Cambodia 🇰🇭</option>
                <option value="KI">Kiribati 🇰🇮</option>
                <option value="KN">Saint Kitts and Nevis 🇰🇳</option>
                <option value="KR">South Korea 🇰🇷</option>
                <option value="KW">Kuwait 🇰🇼</option>
                <option value="LA">Laos 🇱🇦</option>
                <option value="LB">Lebanon 🇱🇧</option>
                <option value="LR">Liberia 🇱🇷</option>
                <option value="LY">Libya 🇱🇾</option>
                <option value="LC">Saint Lucia 🇱🇨</option>
                <option value="LI">Liechtenstein 🇱🇮</option>
                <option value="LK">Sri Lanka 🇱🇰</option>
                <option value="LS">Lesotho 🇱🇸</option>
                <option value="LT">Lithuania 🇱🇹</option>
                <option value="LU">Luxembourg 🇱🇺</option>
                <option value="LV">Latvia 🇱🇻</option>
                <option value="MA">Morocco 🇲🇦</option>
                <option value="MC">Monaco 🇲🇨</option>
                <option value="MD">Moldova 🇲🇩</option>
                <option value="MG">Madagascar 🇲🇬</option>
                <option value="MV">Maldives 🇲🇻</option>
                <option value="MX">Mexico 🇲🇽</option>
                <option value="MH">Marshall Islands 🇲🇭</option>
                <option value="MK">Macedonia 🇲🇰</option>
                <option value="ML">Mali 🇲🇱</option>
                <option value="MT">Malta 🇲🇹</option>
                <option value="MM">Myanmar 🇲🇲</option>
                <option value="ME">Montenegro 🇲🇪</option>
                <option value="MN">Mongolia 🇲🇳</option>
                <option value="MZ">Mozambique 🇲🇿</option>
                <option value="MR">Mauritania 🇲🇷</option>
                <option value="MU">Mauritius 🇲🇺</option>
                <option value="MW">Malawi 🇲🇼</option>
                <option value="MY">Malaysia 🇲🇾</option>
                <option value="NA">Namibia 🇳🇦</option>
                <option value="NE">Niger 🇳🇪</option>
                <option value="NG">Nigeria 🇳🇬</option>
                <option value="NI">Nicaragua 🇳🇮</option>
                <option value="NL">Netherlands 🇳🇱</option>
                <option value="NO">Norway 🇳🇴</option>
                <option value="NP">Nepal 🇳🇵</option>
                <option value="NR">Nauru 🇳🇷</option>
                <option value="NZ">New Zealand 🇳🇿</option>
                <option value="OM">Oman 🇴🇲</option>
                <option value="PK">Pakistan 🇵🇰</option>
                <option value="PA">Panama 🇵🇦</option>
                <option value="PE">Peru 🇵🇪</option>
                <option value="PH">Philippines 🇵🇭</option>
                <option value="PW">Palau 🇵🇼</option>
                <option value="PG">Papua New Guinea 🇵🇬</option>
                <option value="PL">Poland 🇵🇱</option>
                <option value="KP">North Korea 🇰🇵</option>
                <option value="PT">Portugal 🇵🇹</option>
                <option value="PY">Paraguay 🇵🇾</option>
                <option value="QA">Qatar 🇶🇦</option>
                <option value="RO">Romania 🇷🇴</option>
                <option value="RU">Russia 🇷🇺</option>
                <option value="RW">Rwanda 🇷🇼</option>
                <option value="SA">Saudi Arabia 🇸🇦</option>
                <option value="SD">Sudan 🇸🇩</option>
                <option value="SN">Senegal 🇸🇳</option>
                <option value="SG">Singapore 🇸🇬</option>
                <option value="SB">Solomon Islands 🇸🇧</option>
                <option value="SL">Sierra Leone 🇸🇱</option>
                <option value="SV">El Salvador 🇸🇻</option>
                <option value="SM">San Marino 🇸🇲</option>
                <option value="SO">Somalia 🇸🇴</option>
                <option value="RS">Serbia 🇷🇸</option>
                <option value="SS">South Sudan 🇸🇸</option>
                <option value="ST">São Tomé and Príncipe 🇸🇹</option>
                <option value="SR">Suriname 🇸🇷</option>
                <option value="SK">Slovakia 🇸🇰</option>
                <option value="SI">Slovenia 🇸🇮</option>
                <option value="SE">Sweden 🇸🇪</option>
                <option value="SZ">Swaziland 🇸🇿</option>
                <option value="SC">Seychelles 🇸🇨</option>
                <option value="SY">Syria 🇸🇾</option>
                <option value="TD">Chad 🇹🇩</option>
                <option value="TG">Togo 🇹🇬</option>
                <option value="TH">Thailand 🇹🇭</option>
                <option value="TJ">Tajikistan 🇹🇯</option>
                <option value="TM">Turkmenistan 🇹🇲</option>
                <option value="TL">Timor-Leste 🇹🇱</option>
                <option value="TO">Tonga 🇹🇴</option>
                <option value="TT">Trinidad and Tobago 🇹🇹</option>
                <option value="TN">Tunisia 🇹🇳</option>
                <option value="TR">Turkey 🇹🇷</option>
                <option value="TV">Tuvalu 🇹🇻</option>
                <option value="TZ">Tanzania 🇹🇿</option>
                <option value="UG">Uganda 🇺🇬</option>
                <option value="UA">Ukraine 🇺🇦</option>
                <option value="UY">Uruguay 🇺🇾</option>
                <option value="US">United States 🇺🇸</option>
                <option value="UZ">Uzbekistan 🇺🇿</option>
                <option value="VA">Vatican City 🇻🇦</option>
                <option value="VC">Saint Vincent and the Grenadines 🇻🇨</option>
                <option value="VE">Venezuela 🇻🇪</option>
                <option value="VN">Vietnam 🇻🇳</option>
                <option value="VU">Vanuatu 🇻🇺</option>
                <option value="WS">Samoa 🇼🇸</option>
                <option value="YE">Yemen 🇾🇪</option>
                <option value="ZA">South Africa 🇿🇦</option>
                <option value="ZM">Zambia 🇿🇲</option>
                <option value="ZW">Zimbabwe 🇿🇼</option>
            </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
            value={email}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}
            value={password}/>
        </Form.Group>
        <Button type="submit">
          Register
        </Button>
      </Form>
      <hr></hr>
      <span>
          Already have an account? <Link to="/login">Sign In</Link>
      </span>
    </Container>
  );
};

export default RegisterScreen;