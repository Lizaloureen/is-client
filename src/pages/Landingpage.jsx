import './Landingpage.css'
const Landingpage = () => {
    return (
        <>
            <header>
                <nav>
                    <div class="logo">Firearms Licensing</div>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </nav>
            </header>

            <section id="home">
                <div class="hero">
                    <h1>Welcome to the Firearms Portal</h1>
                    <p>Choose any services</p>
                    <a href="#about" class="btn">Learn More</a>
                </div>
            </section>

            <section id="about">
                <h2>About Us</h2>
                <p>We are a company dedicated to ensuring that firearms land in the right hands.</p>
            </section>

            <section id="services">
                <h2>Our Services</h2>
                <div class="services-container">
                    <div class="service">
                        <h3>Service One</h3>
                        <p>Registration.</p>
                    </div>
                    <div class="service">
                        <h3>Service Two</h3>
                        <p>Aplication of Firearms.</p>
                    </div>
                    <div class="service">
                        <h3>Service Three</h3>
                        <p>Renewal of a license.</p>
                    </div>
                </div>
            </section>

            <section id="contact">
                <h2>Contact Us</h2>
                <form>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required />
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required />
                    <label for="message">Message</label>
                    <textarea id="message" name="message" required></textarea>
                    <button type="submit">Send</button>
                </form>
            </section>

            <footer>
                <p>&copy; 2024 Firearms. All rights reserved.</p>
            </footer>

        </>
    )
  }

export default Landingpage;