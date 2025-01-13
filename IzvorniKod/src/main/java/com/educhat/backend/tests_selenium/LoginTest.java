package com.educhat.backend.tests_selenium;



import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.Duration;
import java.util.List;

public class LoginTest {
    WebDriver driver;

    @BeforeEach
    public void setup(){
        driver = new ChromeDriver();
    }

    @Test
    public void loginTest_successfullLogin(){
        driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));

        driver.get("http://localhost:5173/login");

        List<WebElement> inputs = driver.findElements(By.cssSelector("input"));
        WebElement emailInput = inputs.get(0);
        WebElement passwordInput = inputs.get(1);
        WebElement signInButton = driver.findElement(By.cssSelector("button[type=submit]"));

        emailInput.sendKeys("unizq@gmail.com");
        passwordInput.sendKeys("unizq");

        signInButton.click();

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(3));
        String urlAfterLogin = driver.getCurrentUrl();
        assertEquals("http://localhost:5173/home", urlAfterLogin);
    }
    @Test
    public void loginTest_failedLogin(){
        driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));

        driver.get("http://localhost:5173/login");

        List<WebElement> inputs = driver.findElements(By.cssSelector("input"));
        WebElement emailInput = inputs.get(0);
        WebElement passwordInput = inputs.get(1);
        WebElement signInButton = driver.findElement(By.cssSelector("button[type=submit]"));

        emailInput.sendKeys("no_existing_user@gmail.com");
        passwordInput.sendKeys("no_existing_user");

        signInButton.click();

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(3));
        String urlAfterLogin = driver.getCurrentUrl();
        assertEquals(urlAfterLogin, "http://localhost:5173/login", urlAfterLogin);
        WebElement emailErrorMessage = driver.findElement(By.xpath("//*[text()='Invalid email']"));
        WebElement passwordErrorMessage = driver.findElement(By.xpath("//*[text()='Invalid password']"));
    }
    @Test
    public void loginTest_redirectToGoogleAuth(){
        driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));

        driver.get("http://localhost:5173/login");

        WebElement signInWithGoogleButton = driver.findElement(
                By.xpath("//*[text()='Sign in with Google']")
        );

        signInWithGoogleButton.click();

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));

        String googleRedirectUrl = driver.getCurrentUrl();

        assertEquals(true, googleRedirectUrl.contains("https://accounts.google.com"));


    }


    @Test
    public void loginTest_redirectToRegisterPage(){
        driver.get("http://localhost:5173/login");

        WebElement signInWithGoogleLink = driver.findElement(
                By.xpath("//*[text()='Sign up']")
        );
        signInWithGoogleLink.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));

        String googleRedirectUrl = driver.getCurrentUrl();
        assertEquals("http://localhost:5173/register",googleRedirectUrl);
    }

    @AfterEach
    public void tearDown(){
        driver.quit();
    }
}
