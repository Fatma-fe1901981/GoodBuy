package gui;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JButton;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JLabel;

public class JoinQuery extends JFrame {

	private JPanel contentPane;

	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					JoinQuery join = new JoinQuery();
					join.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	public JoinQuery() {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 702, 400);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));

		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		JButton cost = new JButton("Cost");
		cost.setFont(new Font("Tahoma", Font.PLAIN, 16));
		cost.setBounds(263, 232, 170, 42);
		contentPane.add(cost);
		cost.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                Cost results = new Cost();
                results.setVisible(true);
                dispose();
            }
        });
		
		JLabel query1 = new JLabel("Select * from AIRPLANE_TYPE , AIRPLANE ");
		query1.setFont(new Font("Tahoma", Font.PLAIN, 20));
		query1.setBounds(151, 98, 430, 35);
		contentPane.add(query1);
		
		JLabel query2 = new JLabel("Where AIRPLANE.Type_Name = AIRPLANE_TYPE.Type_Name; ");
		query2.setFont(new Font("Tahoma", Font.PLAIN, 20));
		query2.setBounds(69, 144, 582, 25);
		contentPane.add(query2);
		
		JLabel join = new JLabel("JOIN QUERY");
		join.setFont(new Font("Times New Roman", Font.BOLD | Font.ITALIC, 25));
		join.setBounds(286, 33, 170, 54);
		contentPane.add(join);
	}
}