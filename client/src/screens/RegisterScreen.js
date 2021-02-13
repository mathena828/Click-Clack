import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { Link } from "react-router-dom";
import {Form, Button, Alert, Container} from 'react-bootstrap'

const server = "http://localhost:5000";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [school, setSchool] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [, setCookie] = useCookies(['user']);

  function handleTeacherClick(){
    setIsTeacher(true);
  }
  function handleStudentClick(){
    setIsTeacher(false);
  }
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
          country,
          isTeacher
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
        <div style={{textAlign:"center"}}>
        <Form.Group>
          <Form.Label><h5>I am a...</h5></Form.Label> <br/>
          <Button onClick={handleTeacherClick} variant={isTeacher ? "secondary" : "light"}>Teacher</Button>{"   "}<Button onClick={handleStudentClick} variant={isTeacher ? "light" : "secondary"}>Student</Button>
        </Form.Group>
        </div>
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
                <option value="Afghanistan">Afghanistan 🇦🇫</option>
                <option value="Angola">Angola 🇦🇴</option>
                <option value="Albania">Albania 🇦🇱</option>
                <option value="Andorra">Andorra 🇦🇩</option>
                <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
                <option value="Argentina">Argentina 🇦🇷</option>
                <option value="Armenia">Armenia 🇦🇲</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda 🇦🇬</option>
                <option value="Australia">Australia 🇦🇺</option>
                <option value="Austria">Austria 🇦🇹</option>
                <option value="Azerbaijan">Azerbaijan 🇦🇿</option>
                <option value="Burundi">Burundi 🇧🇮</option>
                <option value="Belgium">Belgium 🇧🇪</option>
                <option value="Benin">Benin 🇧🇯</option>
                <option value="Burkina Faso">Burkina Faso 🇧🇫</option>
                <option value="Bangladesh">Bangladesh 🇧🇩</option>
                <option value="Bulgaria">Bulgaria 🇧🇬</option>
                <option value="Bahrain">Bahrain 🇧🇭</option>
                <option value="Bahamas">Bahamas 🇧🇸</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina 🇧🇦</option>
                <option value="Belarus">Belarus 🇧🇾</option>
                <option value="Belize">Belize 🇧🇿</option>
                <option value="Bolivia">Bolivia 🇧🇴</option>
                <option value="Brazil">Brazil 🇧🇷</option>
                <option value="Barbados">Barbados 🇧🇧</option>
                <option value="Brunei">Brunei 🇧🇳</option>
                <option value="Bhutan">Bhutan 🇧🇹</option>
                <option value="Botswana">Botswana 🇧🇼</option>
                <option value="Central African Republic">Central African Republic 🇨🇫</option>
                <option value="Canada">Canada 🇨🇦</option>
                <option value="Switzerland">Switzerland 🇨🇭</option>
                <option value="Chile">Chile 🇨🇱</option>
                <option value="China">China 🇨🇳</option>
                <option value="Ivory Coast">Ivory Coast 🇨🇮</option>
                <option value="Cameroon">Cameroon 🇨🇲</option>
                <option value="DR Congo">DR Congo 🇨🇩</option>
                <option value="Republic of the Congo">Republic of the Congo 🇨🇬</option>
                <option value="Colombia">Colombia 🇨🇴</option>
                <option value="Comoros">Comoros 🇰🇲</option>
                <option value="Cape Verde">Cape Verde 🇨🇻</option>
                <option value="Costa Rica">Costa Rica 🇨🇷</option>
                <option value="Cuba">Cuba 🇨🇺</option>
                <option value="Cyprus">Cyprus 🇨🇾</option>
                <option value="Czechia">Czechia 🇨🇿</option>
                <option value="Germany">Germany 🇩🇪</option>
                <option value="Djibouti">Djibouti 🇩🇯</option>
                <option value="Dominica">Dominica 🇩🇲</option>
                <option value="Denmark">Denmark 🇩🇰</option>
                <option value="Dominican Republic">Dominican Republic 🇩🇴</option>
                <option value="Algeria">Algeria 🇩🇿</option>
                <option value="Ecuador">Ecuador 🇪🇨</option>
                <option value="Egypt">Egypt 🇪🇬</option>
                <option value="Eritrea">Eritrea 🇪🇷</option>
                <option value="Spain">Spain 🇪🇸</option>
                <option value="Estonia">Estonia 🇪🇪</option>
                <option value="Ethiopia">Ethiopia 🇪🇹</option>
                <option value="Finland">Finland 🇫🇮</option>
                <option value="Fiji">Fiji 🇫🇯</option>
                <option value="France">France 🇫🇷</option>
                <option value="Micronesia">Micronesia 🇫🇲</option>
                <option value="Gabon">Gabon 🇬🇦</option>
                <option value="United Kingdom">United Kingdom 🇬🇧</option>
                <option value="Georgia">Georgia 🇬🇪</option>
                <option value="Ghana">Ghana 🇬🇭</option>
                <option value="Guinea">Guinea 🇬🇳</option>
                <option value="Gambia">Gambia 🇬🇲</option>
                <option value="Guinea-Bissau">Guinea-Bissau 🇬🇼</option>
                <option value="Equatorial Guinea">Equatorial Guinea 🇬🇶</option>
                <option value="Greece">Greece 🇬🇷</option>
                <option value="Grenada">Grenada 🇬🇩</option>
                <option value="Guatemala">Guatemala 🇬🇹</option>
                <option value="Guyana">Guyana 🇬🇾</option>
                <option value="Honduras">Honduras 🇭🇳</option>
                <option value="Croatia">Croatia 🇭🇷</option>
                <option value="Haiti">Haiti 🇭🇹</option>
                <option value="Hungary">Hungary 🇭🇺</option>
                <option value="Indonesia">Indonesia 🇮🇩</option>
                <option value="India">India 🇮🇳</option>
                <option value="Ireland">Ireland 🇮🇪</option>
                <option value="Iran">Iran 🇮🇷</option>
                <option value="Iraq">Iraq 🇮🇶</option>
                <option value="Iceland">Iceland 🇮🇸</option>
                <option value="Israel">Israel 🇮🇱</option>
                <option value="Italy">Italy 🇮🇹</option>
                <option value="Jamaica">Jamaica 🇯🇲</option>
                <option value="Jordan">Jordan 🇯🇴</option>
                <option value="Japan">Japan 🇯🇵</option>
                <option value="Kazakhstan">Kazakhstan 🇰🇿</option>
                <option value="Kenya">Kenya 🇰🇪</option>
                <option value="Kyrgyzstan">Kyrgyzstan 🇰🇬</option>
                <option value="Cambodia">Cambodia 🇰🇭</option>
                <option value="Kiribati">Kiribati 🇰🇮</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis 🇰🇳</option>
                <option value="South Korea">South Korea 🇰🇷</option>
                <option value="Kuwait">Kuwait 🇰🇼</option>
                <option value="Laos">Laos 🇱🇦</option>
                <option value="Lebanon">Lebanon 🇱🇧</option>
                <option value="Liberia">Liberia 🇱🇷</option>
                <option value="Libya">Libya 🇱🇾</option>
                <option value="Saint Lucia">Saint Lucia 🇱🇨</option>
                <option value="Liechtenstein">Liechtenstein 🇱🇮</option>
                <option value="Sri Lanka">Sri Lanka 🇱🇰</option>
                <option value="Lesotho">Lesotho 🇱🇸</option>
                <option value="Lithuania">Lithuania 🇱🇹</option>
                <option value="Luxembourg">Luxembourg 🇱🇺</option>
                <option value="Latvia">Latvia 🇱🇻</option>
                <option value="Morocco">Morocco 🇲🇦</option>
                <option value="Monaco">Monaco 🇲🇨</option>
                <option value="Moldova">Moldova 🇲🇩</option>
                <option value="Madagascar">Madagascar 🇲🇬</option>
                <option value="Maldives">Maldives 🇲🇻</option>
                <option value="Mexico">Mexico 🇲🇽</option>
                <option value="Marshall Islands">Marshall Islands 🇲🇭</option>
                <option value="Macedonia">Macedonia 🇲🇰</option>
                <option value="Mali">Mali 🇲🇱</option>
                <option value="Malta">Malta 🇲🇹</option>
                <option value="Myanmar">Myanmar 🇲🇲</option>
                <option value="Montenegro">Montenegro 🇲🇪</option>
                <option value="Mongolia">Mongolia 🇲🇳</option>
                <option value="Mozambique">Mozambique 🇲🇿</option>
                <option value="Mauritania">Mauritania 🇲🇷</option>
                <option value="Mauritius">Mauritius 🇲🇺</option>
                <option value="Malawi">Malawi 🇲🇼</option>
                <option value="Malaysia">Malaysia 🇲🇾</option>
                <option value="Namibia">Namibia 🇳🇦</option>
                <option value="Niger">Niger 🇳🇪</option>
                <option value="Nigeria">Nigeria 🇳🇬</option>
                <option value="Nicaragua">Nicaragua 🇳🇮</option>
                <option value="Netherlands">Netherlands 🇳🇱</option>
                <option value="Norway">Norway 🇳🇴</option>
                <option value="Nepal">Nepal 🇳🇵</option>
                <option value="Nauru">Nauru 🇳🇷</option>
                <option value="New Zealand">New Zealand 🇳🇿</option>
                <option value="Oman">Oman 🇴🇲</option>
                <option value="Pakistan">Pakistan 🇵🇰</option>
                <option value="Panama">Panama 🇵🇦</option>
                <option value="Peru">Peru 🇵🇪</option>
                <option value="Philippines">Philippines 🇵🇭</option>
                <option value="Palau">Palau 🇵🇼</option>
                <option value="Papua New Guinea">Papua New Guinea 🇵🇬</option>
                <option value="Poland">Poland 🇵🇱</option>
                <option value="North Korea">North Korea 🇰🇵</option>
                <option value="Portugal">Portugal 🇵🇹</option>
                <option value="Paraguay">Paraguay 🇵🇾</option>
                <option value="Qatar">Qatar 🇶🇦</option>
                <option value="Romania">Romania 🇷🇴</option>
                <option value="Russia">Russia 🇷🇺</option>
                <option value="Rwanda">Rwanda 🇷🇼</option>
                <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                <option value="Sudan">Sudan 🇸🇩</option>
                <option value="Senegal">Senegal 🇸🇳</option>
                <option value="Singapore">Singapore 🇸🇬</option>
                <option value="Solomon Islands">Solomon Islands 🇸🇧</option>
                <option value="Sierra Leone">Sierra Leone 🇸🇱</option>
                <option value="El Salvador">El Salvador 🇸🇻</option>
                <option value="San Marino">San Marino 🇸🇲</option>
                <option value="Somalia">Somalia 🇸🇴</option>
                <option value="Serbia">Serbia 🇷🇸</option>
                <option value="South Sudan">South Sudan 🇸🇸</option>
                <option value="São Tomé and Príncipe">São Tomé and Príncipe 🇸🇹</option>
                <option value="Suriname">Suriname 🇸🇷</option>
                <option value="Slovakia">Slovakia 🇸🇰</option>
                <option value="Slovenia">Slovenia 🇸🇮</option>
                <option value="Sweden">Sweden 🇸🇪</option>
                <option value="Swaziland">Swaziland 🇸🇿</option>
                <option value="Seychelles">Seychelles 🇸🇨</option>
                <option value="Syria">Syria 🇸🇾</option>
                <option value="Chad">Chad 🇹🇩</option>
                <option value="Togo">Togo 🇹🇬</option>
                <option value="Thailand">Thailand 🇹🇭</option>
                <option value="Tajikistan">Tajikistan 🇹🇯</option>
                <option value="Turkmenistan">Turkmenistan 🇹🇲</option>
                <option value="Timor-Leste">Timor-Leste 🇹🇱</option>
                <option value="Tonga">Tonga 🇹🇴</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago 🇹🇹</option>
                <option value="Tunisia">Tunisia 🇹🇳</option>
                <option value="Turkey">Turkey 🇹🇷</option>
                <option value="Tuvalu">Tuvalu 🇹🇻</option>
                <option value="Tanzania">Tanzania 🇹🇿</option>
                <option value="Uganda">Uganda 🇺🇬</option>
                <option value="Ukraine">Ukraine 🇺🇦</option>
                <option value="Uruguay">Uruguay 🇺🇾</option>
                <option value="United States">United States 🇺🇸</option>
                <option value="Uzbekistan">Uzbekistan 🇺🇿</option>
                <option value="Vatican City">Vatican City 🇻🇦</option>
                <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines 🇻🇨</option>
                <option value="Venezuela">Venezuela 🇻🇪</option>
                <option value="Vietnam">Vietnam 🇻🇳</option>
                <option value="Vanuatu">Vanuatu 🇻🇺</option>
                <option value="Samoa">Samoa 🇼🇸</option>
                <option value="Yemen">Yemen 🇾🇪</option>
                <option value="South Africa">South Africa 🇿🇦</option>
                <option value="Zambia">Zambia 🇿🇲</option>
                <option value="Zimbabwe">Zimbabwe 🇿🇼</option>
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