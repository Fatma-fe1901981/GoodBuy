

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JLabel;
import java.awt.Font;
import javax.swing.SwingConstants;
import java.awt.Component;
import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JSeparator;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class MainScreen extends JFrame {

	private static final long serialVersionUID = 1L;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					MainScreen frame = new MainScreen();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */
	public MainScreen() {
		setBounds(100, 100, 1080, 720);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		getContentPane().setLayout(null);
		
		JLabel title = new JLabel("Query Analyzer and Cost Estimator");
		title.setFont(new Font("Tahoma", Font.PLAIN, 45));
		title.setBounds(189, 86, 699, 89);
		getContentPane().add(title);
		
		JLabel lblNewLabel = new JLabel("We offer the following services");
		lblNewLabel.setFont(new Font("Tahoma", Font.PLAIN, 30));
		lblNewLabel.setBounds(325, 186, 426, 37);
		getContentPane().add(lblNewLabel);
		
		JButton btnNewButton = new JButton("Metadata");
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				MetadataDisplay d = new MetadataDisplay();
				d.setVisible(true);
				//d.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
			}
		});
		btnNewButton.setFont(new Font("Tahoma", Font.PLAIN, 20));
		btnNewButton.setBounds(142, 348, 249, 48);
		getContentPane().add(btnNewButton);
		
		JSeparator separator = new JSeparator();
		separator.setBounds(249, 173, 585, 2);
		getContentPane().add(separator);
		
		JButton btnQuering = new JButton("Quering");
		btnQuering.setFont(new Font("Tahoma", Font.PLAIN, 20));
		btnQuering.setBounds(674, 348, 249, 48);
		getContentPane().add(btnQuering);

	}
}
