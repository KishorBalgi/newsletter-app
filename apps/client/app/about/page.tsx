// About page:
import Image from "next/image";
import LinkedInIcon from "@assets/icons/linkedin.png";
import TwitterIcon from "@assets/icons/twitter.png";
import GitHubIcon from "@assets/icons/github.png";

export default function Page() {
  return (
    <div className="m-14 mt-20 p-5">
      <section id="about" className="mt-10">
        <h1 className="text-3xl font-bold mb-4">About Project</h1>

        <p className="mt-4">
          The newsletter application is a comprehensive platform designed to
          streamline the creation, management, and distribution of newsletters
          and articles. Leveraging modern technologies and best practices, this
          project offers a robust and scalable solution for publishers and
          subscribers alike.
          <br /> <br />
          <p>
            Designed and Developed by{" "}
            <a
              href="https://www.linkedin.com/in/kishorbalgi/"
              target="_blank"
              className="text-blue-500"
            >
              {" "}
              Kishor Balgi
            </a>
            .
          </p>
        </p>

        <h1 className="text-3xl font-bold mt-8">Developer Details</h1>

        <p className="mt-4">
          Name: <span>Kishor Balgi</span>
        </p>
        <p>
          Email: <span>kishorwebdev@gmail.com</span>
        </p>

        <div className="socials mt-8">
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://www.linkedin.com/in/kishorbalgi/"
                target="_blank"
              >
                <Image src={LinkedInIcon} alt="LinkedIn" className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a href="https://github.com/KishorBalgi" target="_blank">
                <Image src={GitHubIcon} alt="GitHub" className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/KishorBalgi" target="_blank">
                <Image src={TwitterIcon} alt="Twitter" className="w-6 h-6" />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
