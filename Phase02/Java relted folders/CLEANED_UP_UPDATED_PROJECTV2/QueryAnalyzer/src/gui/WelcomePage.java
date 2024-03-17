package gui;

import java.awt.EventQueue;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class WelcomePage extends JFrame {
	public static int  flag = 0;
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					WelcomePage mainPage = new WelcomePage();
					mainPage.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

    public WelcomePage() {
        initialize();
    }

    private void initialize() {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBounds(600, 100, 600, 400);

        JPanel panel = new JPanel();
        getContentPane().add(panel);

        // App Name
        JLabel appName = new JLabel("Query Analyzer and Cost Estimator");
        panel.add(appName);

        // services label
        JLabel services = new JLabel("We provide the following services:");
        panel.add(services);

        JPanel groupButtons = new JPanel();

        // Metadata 
        JButton metadataButton = new JButton("Metadata");
        groupButtons.add(metadataButton);
        metadataButton.addActionListener(e -> openMetadataWindow());

        // Select Query 
        JButton selectQueryButton = new JButton("Select Query");
        groupButtons.add(selectQueryButton);
        selectQueryButton.addActionListener(e -> openSelectQueryWindow());

        // Join Query 
        JButton joinQueryButton = new JButton("Join Query");
        groupButtons.add(joinQueryButton);
        joinQueryButton.addActionListener(e -> openJoinQueryWindow());

        panel.add(groupButtons);
    }

    // a function to display metadata page
    private void openMetadataWindow() {
    	System.out.println("Navigating to Select Query Window");
    	Metadata metadataWindow = new Metadata();
        metadataWindow.setVisible(true);
    }

    // a function to display select query page
    private void openSelectQueryWindow() {
        System.out.println("Navigating to Select Query Window");
        SelectQuery selectQueryWindow = new SelectQuery();
        selectQueryWindow.setVisible(true);
        flag= 1;
    }

    // a function to display join query page
    private void openJoinQueryWindow() {
        System.out.println("Navigating to Join Query Window");
        JoinQuery joinQueryWindow = new JoinQuery();
        joinQueryWindow.setVisible(true);
        flag=0;
    }
}
